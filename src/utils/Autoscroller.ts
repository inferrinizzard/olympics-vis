import { type Dispatch, type RefObject, type SetStateAction } from 'react';

class AutoScroller {
	ref: RefObject<HTMLDivElement>;
	step: number;
	updateStart: Dispatch<SetStateAction<number>>;

	interval?: ReturnType<typeof setInterval>;
	observer?: IntersectionObserver;

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
	}

	start = () => {
		// scroll negative loop
		if (this.step < 0) {
			this.scrollElement?.scrollTo({ left: this.scrollElement.scrollWidth + this.childWidth });
		}

		const headObserverOptions = {
			root: this.scrollElement,
			rootMargin: `${this.childWidth / 10}px`,
			threshold: 0.0,
		};

		const positiveLoop = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
			const targetEntry = entries.find(entry => !entry.isIntersecting);
			if (!targetEntry) return;

			// move target to end, fix scroll pos
			this.flexWrapper?.appendChild(this.flexWrapper?.firstChild!);
			this.scrollElement?.scrollTo({
				left:
					this.step > 0
						? this.scrollElement.scrollLeft - this.childWidth - 8 // margin width
						: this.scrollElement.scrollWidth - this.childWidth - (this.visibleWrapperWidth ?? 0),
			});

			this.updateStart(prev => prev + 1);

			// TODO: adjust visibleWrapperWidth on resize
			// TODO: make scrolling work backwards

			// update observers
			this.flexWrapper?.firstElementChild && observer.observe(this.flexWrapper.firstElementChild);
			observer.unobserve(targetEntry.target);
		};

		this.observer = new IntersectionObserver(positiveLoop, headObserverOptions);
		this.targetElement && this.observer.observe(this.targetElement);

		this.interval = setInterval(
			() =>
				window.requestAnimationFrame(() =>
					this.scrollElement?.scrollTo({ left: this.scrollElement.scrollLeft + this.step })
				),
			100
		);
	};

	close = () => {
		this.interval && clearInterval(this.interval);
		this.observer?.disconnect();
	};
}

export default AutoScroller;
