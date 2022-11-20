import { type RefObject } from 'react';

class AutoScroller {
	ref: RefObject<HTMLDivElement>;
	step: number;
	interval?: ReturnType<typeof setInterval>;
	observer?: IntersectionObserver;

	scrollElement: HTMLDivElement | null;
	flexWrapper?: Element | null;
	targetElement?: Element | null;
	childWidth: number;
	visibleWrapperWidth: number;

	constructor(ref: RefObject<HTMLDivElement>, step: number) {
		this.ref = ref;
		this.step = step;

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
			rootMargin: `${this.childWidth}px`,
			threshold: 0.0,
		};

		const positiveLoop = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
			const targetEntry = entries.find(entry => !entry.isIntersecting);
			if (!targetEntry) return;

			// move target to end, fix scroll pos
			this.flexWrapper?.appendChild(targetEntry.target);
			this.scrollElement?.scrollTo({
				left:
					this.step > 0
						? this.childWidth
						: this.scrollElement.scrollWidth - this.childWidth - (this.visibleWrapperWidth ?? 0),
			});

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
