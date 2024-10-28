export type ResolvedStaticParam<
	StaticParamFunction extends () => Promise<unknown[]>,
> = Awaited<ReturnType<StaticParamFunction>>[number];
