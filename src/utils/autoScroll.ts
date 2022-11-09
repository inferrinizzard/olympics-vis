import { type RefObject } from 'react';

export const autoscroll = (ref: RefObject<HTMLDivElement>, step: number) => {
	if (step < 0) return;

	const scrollElement = ref?.current;
	const flexWrapper = scrollElement?.firstElementChild;
	const targetElement = flexWrapper?.firstElementChild;
	const secondElement = flexWrapper?.children[1];
	const childWidth = flexWrapper?.firstElementChild?.clientWidth ?? 0;
	const visibleWrapperWidth = scrollElement?.clientWidth;

	const headObserverOptions = {
		root: scrollElement,
		rootMargin: `${childWidth}px`,
		threshold: 0.0,
	};

	const positiveLoop = (
		entries: IntersectionObserverEntry[],
		headObserver: IntersectionObserver
	) => {
		const targetEntry = entries.find(entry => !entry.isIntersecting);
		if (!targetEntry) return;

		// move target to end, fix scroll pos
		flexWrapper?.appendChild(targetEntry.target);
		scrollElement?.scrollTo({
			left:
				step > 0 ? childWidth : scrollElement.scrollWidth - childWidth - (visibleWrapperWidth ?? 0),
		});

		// update observers
		flexWrapper?.firstElementChild && headObserver.observe(flexWrapper.firstElementChild);
		headObserver.unobserve(targetEntry.target);
	};

	const headObserver = new IntersectionObserver(positiveLoop, headObserverOptions);
	targetElement && headObserver.observe(targetElement);

	return setInterval(
		() =>
			window.requestAnimationFrame(() =>
				scrollElement?.scrollTo({ left: scrollElement.scrollLeft + step })
			),
		100
	);
};
