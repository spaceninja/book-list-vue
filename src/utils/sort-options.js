export const sortOptions = {
  title: {
    display: 'Title',
    firstBy: 'title',
    firstByOrder: 'ascending',
    thenBy: 'author_lname',
    thenByOrder: 'ascending',
  },
  series: {
    display: 'Series',
    firstBy: 'series',
    firstByOrder: 'ascending',
    thenBy: 'title',
    thenByOrder: 'ascending',
  },
  author_lname: {
    display: 'Author',
    firstBy: 'author_lname',
    firstByOrder: 'ascending',
    thenBy: 'series',
    thenByOrder: 'ascending',
  },
  rating: {
    display: 'Rating',
    firstBy: 'rating',
    firstByOrder: 'descending',
    thenBy: 'length',
    thenByOrder: 'ascending',
  },
  length: {
    display: 'Length',
    firstBy: 'length',
    firstByOrder: 'ascending',
    thenBy: 'rating',
    thenByOrder: 'descending',
  },
};
