export type CategoryTO = {
  id: number;
  name: string;
};

export type CategoryResponseTO = {
  trivia_categories: CategoryTO[];
};
