import { type Dispatch, type RefObject, type SetStateAction } from 'react';

class AutoScroller {
	ref: RefObject<HTMLDivElement>;
	step: number;
	updateStart: Dispatch<SetStateAction<number>>;

	interval?: ReturnType<typeof setInterval>;
	headObserver?: IntersectionObserver;
	wheelHandler: (e: WheelEvent) => void;

	scrollElement: HTMLDivElement | null;
	flexWrapper?: Element | null;
	targetElement?: Element | null;
	childWidth: number;
	visibleWrapperWidth: number;

	constructor(
		ref: RefObject<HTMLDivElement>,
		step: number,
		updateStart: Dispatch<SetStateAction<number>>
	) {
		this.ref = ref;
		this.step = step;
		this.updateStart = updateStart;

		this.scrollElement = ref?.current;
		this.flexWrapper = this.scrollElement?.firstElementChild;
		this.targetElement = this.flexWrapper?.firstElementChild;
		this.childWidth = this.flexWrapper?.firstElementChild?.clientWidth ?? 0;
		this.visibleWrapperWidth = this.scrollElement?.clientWidth ?? 0;

		this.wheelHandler = e => {
			e.preventDefault();
			this.scrollElement?.scrollTo({
				left:
					this.scrollElement.scrollLeft + Math.sign(e.deltaX) * Math.min(50, Math.abs(e.deltaX)),
			});
		};
	}

	start = () => {
		// scroll negative loop
		if (this.step < 0) {
			this.scrollElement?.scrollTo({ left: this.scrollElement.scrollWidth + this.childWidth });
		}

		// add event handler to limit scroll speed
		this.scrollElement?.addEventListener('wheel', this.wheelHandler);

		const headObserverOptions = {
			root: this.scrollElement,
			rootMargin: `${this.childWidth / 10}px`,
			threshold: 0.0,
		};

		this.headObserver = new IntersectionObserver(this.headLoop, headObserverOptions);
		this.targetElement && this.headObserver.observe(this.targetElement);

		this.interval = setInterval(
			() =>
				window.requestAnimationFrame(() =>
					this.scrollElement?.scrollTo({ left: this.scrollElement.scrollLeft + this.step })
				),
			100
		);
	};

	headLoop = (entries: IntersectionObserverEntry[], headObserver: IntersectionObserver) => {
		const targetEntry = entries.find(entry => !entry.isIntersecting);
		if (!targetEntry) return;

		// move target to end, fix scroll pos
		this.flexWrapper?.appendChild(this.flexWrapper?.firstChild!);
		this.scrollElement?.scrollTo({
			left:
				this.step > 0
					? this.scrollElement.scrollLeft - this.childWidth - 8 // margin width
					: this.scrollElement.scrollWidth - this.childWidth - (this.visibleWrapperWidth ?? 0) + 8,
		});

		this.updateStart(prev => prev + 1);

		// TODO: adjust visibleWrapperWidth on resize
		// TODO: make scrolling work backwards

		// update observers
		this.flexWrapper?.firstElementChild && headObserver.observe(this.flexWrapper.firstElementChild);
		headObserver.unobserve(targetEntry.target);
	};

	close = () => {
		this.interval && clearInterval(this.interval);
		this.headObserver?.disconnect();
		this.scrollElement?.removeEventListener('wheel', this.wheelHandler);
	};
}

export default AutoScroller;
