export const filterOptions = {
  is_purchased: {
    display: 'Purchased',
    filterBy: 'is_purchased',
    unFilterBy: 'unpurchased',
  },
  is_prioritized: {
    display: 'Prioritized',
    filterBy: 'is_prioritized',
    unFilterBy: 'unprioritized',
  },
  is_tagged: {
    display: 'Tagged',
    filterBy: 'is_tagged',
    unFilterBy: 'untagged',
  },
  is_dated: {
    display: 'Dated',
    filterBy: 'is_dated',
    unFilterBy: 'undated',
  },
  unpurchased: {
    display: 'Unpurchased',
    unFilterBy: 'is_purchased',
    filterBy: 'unpurchased',
  },
  unprioritized: {
    display: 'Unprioritized',
    unFilterBy: 'is_prioritized',
    filterBy: 'unprioritized',
  },
  untagged: {
    display: 'Untagged',
    unFilterBy: 'is_tagged',
    filterBy: 'untagged',
  },
  undated: {
    display: 'Undated',
    unFilterBy: 'is_dated',
    filterBy: 'undated',
  },
};
