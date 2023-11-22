//export type GameId = "_id";

export interface Game {
	id: string;
	slug: string;
	title: string;
	tag: string | null;
	providerName: string;
	startUrl: string;
	thumb: Thumbnail;
}

export interface Thumbnail {
	url: string;
	title: string;
}
