/**
 * The one tooltip on the page (#10). Charts do not each own a tooltip element;
 * they publish to this state and a single instance in the layout renders it.
 */

interface TooltipState {
	content: string;
	x: number;
	y: number;
	visible: boolean;
}

export const tooltip: TooltipState = $state({ content: '', x: 0, y: 0, visible: false });

export const showTooltip = (content: string, event: MouseEvent): void => {
	tooltip.content = content;
	tooltip.x = event.clientX;
	tooltip.y = event.clientY;
	tooltip.visible = true;
};

export const hideTooltip = (): void => {
	tooltip.visible = false;
};
