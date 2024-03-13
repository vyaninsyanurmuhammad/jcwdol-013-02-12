export interface IPostInitialState {
  posts: IPost[];
}

export interface IPost {
  id: string;
  message: string;
  image?: IImage;
}

export interface IImage {
  id: string;
  title: string;
  url: string;
}
