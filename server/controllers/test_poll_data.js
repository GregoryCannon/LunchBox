const pollData = {
  pollName: 'test',
  options: [
    { name: 'nameisabc',
      yelpId: '69420',
      imgUrl: 'google.com',
      price: '$$',
      rating: '3',
      distance: '5.0',
      categories: 'boba, poke',
      yelpUrl: 'apple.com',
      voters: {
        Greg: 'up',
        Dan: 'down',
        Ben: 'down',
        John: 'veto'
      }
    },
    { name: 'nameis123',
      yelpId: '12369',
      imgUrl: 'gizoogle.com',
      price: '$$$$',
      rating: '5',
      distance: '6.0',
      categories: 'chedda, cheez',
      yelpUrl: 'dank.kush',
      voters: {
        Greg: 'up'
      }
    }
  ],
  endTime: new Date()
};

module.exports = pollData;
