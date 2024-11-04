import { Block } from "payload";

export const ThreeColumnBlock: Block = {
	slug: "threecolumn", // required
	labels: {
		singular: "Three Column",
		plural: "Three Columns",
	},
	fields: [
		{
			label: "Title",
			name: "title",
			type: "text",
		},
		{
			name: "items",
			type: "array",
			fields: [
				{
					name: "title",
					type: "text",
				},
				{
					name: "description",
					type: "textarea",
				},
			],
		},
	],
};

export type ThreeColumnBlockProps = {
	title: string;
	items: {
		title: string;
		description: string;
	}[];
};

export const ThreeColumn = ({ data: { title, items } }: { data: ThreeColumnBlockProps }) => {
	return (
		<div className="flex flex-col gap-4">
			<h2>{title}</h2>
			<div className="flex gap-4">
				{items.map(({ title, description }, index) => (
					<div key={index}>
						<h4>{title}</h4>
						<p>{description}</p>
					</div>
				))}
			</div>
		</div>
	);
};
