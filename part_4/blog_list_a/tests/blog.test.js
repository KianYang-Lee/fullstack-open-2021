const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs, 'likes');
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [{
      title: 'Good Food',
      author: 'Penang Foodies',
      url: 'www.abc.com',
      likes: 3
    }];

    const result = listHelper.totalLikes(blogs, 'likes');
    expect(result).toBe(3);
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        title: 'Good Food',
        author: 'Penang Foodies',
        url: 'www.abc.com',
        likes: 3
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ];

    const result = listHelper.totalLikes(blogs, 'likes');
    expect(result).toBe(8);
  });
});


describe('top liked blog', () => {
  test('of a bigger list is selected right', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Good Food',
        author: 'Penang Foodies',
        url: 'www.abc.com',
        likes: 3,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f5',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations.html',
        __v: 0
      }
    ];

    const result = listHelper.mostLikedBlog(blogs);
    console.log(result);
    expect(result).toEqual(
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      }
    );
  });
});



