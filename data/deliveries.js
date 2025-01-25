const deliveries = [
    {
        customer: {
          id: '1',
          name: 'John Doe',
          address: 'street, city, country',
          phoneNumber: '+230 57776666'
        },
        dateOrdered: new Date('2025-01-10T10:15'),
        details: {
          items: ['Burger'],
          totalPrice: 250
        },
        expectedDeliveryTime: new Date('2025-01-11T11:15'),
        id: '1',
        paymentMethod: 0,
        paymentStatus: 0,
        restaurant: {
          address: 'restaurant address',
          id: '2',
          name: 'Le Sapin D\'or',
          phoneNumber: '+230 5666 7777',
          photoUrl: 'https://www.ordermanzer.mu/modules/restaurantsmod/images/277.jpg'
        },
        status: 0,
    },
    {
        customer: {
          id: '2',
          name: 'Mary Ann',
          address: 'street, city, country',
          phoneNumber: '+230 57776666'
        },
        dateOrdered: new Date('2025-01-10T10:15'),
        details: {
          items: ['Wrap'],
          totalPrice: 150
        },
        expectedDeliveryTime: new Date('2025-01-11T11:15'),
        id: '2',
        paymentMethod: 0,
        paymentStatus: 0,
        restaurant: {
          address: 'restaurant address',
          id: '2',
          name: 'Pizza Hut',
          phoneNumber: '+230 5666 7777',
          photoUrl: 'https://yt3.googleusercontent.com/Hy54CNQA2pJ2D3DoqT8ZbN0bDrq81lPdyE3fZcIM9jeObGrpKaVZX3JzLNnGMkyY6naPFhlQ=s900-c-k-c0x00ffffff-no-rj'
        },
        status: 0,
      },
];

module.exports = deliveries;