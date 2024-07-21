import mock from '../mock';
import { Chance } from 'chance';
import { random } from 'lodash';
import { sub } from 'date-fns';
import s1 from 'src/assets/images/blog/blog-img1.jpg';
import s2 from 'src/assets/images/blog/blog-img2.jpg';
import s3 from 'src/assets/images/blog/blog-img3.jpg';
import s4 from 'src/assets/images/blog/blog-img4.jpg';
import s5 from 'src/assets/images/blog/blog-img5.jpg';
import s6 from 'src/assets/images/blog/blog-img6.jpg';
import s7 from 'src/assets/images/blog/blog-img11.jpg';
import s8 from 'src/assets/images/blog/blog-img8.jpg';
import s9 from 'src/assets/images/blog/blog-img9.jpg';
import s10 from 'src/assets/images/blog/blog-img10.jpg';

import { uniqueId } from 'lodash';

const chance = new Chance();

const BlogComment = [{
        id: uniqueId('#comm_'),
        time: chance.date(),
        comment: chance.paragraph({ sentences: 2 }),
        replies: [],
    },
    {
        id: uniqueId('#comm_'),
        profile: {
            id: chance.integer({ min: 1, max: 2000 }),

            name: chance.name(),
        },
        time: chance.date(),
        comment: chance.paragraph({ sentences: 2 }),
        replies: [{
            id: uniqueId('#comm_'),
            profile: {
                id: chance.integer({ min: 1, max: 2000 }),

                name: chance.name(),
            },
            time: chance.date(),
            comment: chance.paragraph({ sentences: 2 }),
        }, ],
    },
    {
        id: uniqueId('#comm_'),
        profile: {
            id: chance.integer({ min: 1, max: 2000 }),

            name: chance.name(),
        },
        time: chance.date(),
        comment: chance.paragraph({ sentences: 2 }),
        replies: [],
    },
];

const BlogPost = [{
        id: chance.integer({ min: 1, max: 2000 }),
        title: 'Understanding Your First Trimester: What to Expect',
        content: chance.paragraph({ sentences: 2 }),
        coverImg: s1,
        createdAt: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
        view: random(9999),
        share: random(9999),
        category: 'Pregnancy',
        featured: false,
        author: {
            id: chance.integer({ min: 1, max: 2000 }),

            name: chance.name(),
        },
        comments: BlogComment,
    },
    {
        id: chance.integer({ min: 1, max: 2000 }),
        title: 'Essential Prenatal Vitamins for a Healthy Pregnancy',
        content: chance.paragraph({ sentences: 2 }),
        coverImg: s2,
        createdAt: sub(new Date(), { days: 7, hours: 3, minutes: 20 }),
        view: random(9999),
        share: random(9999),
        category: 'Nutrition & Supplements',
        featured: false,
        author: {
            id: chance.integer({ min: 1, max: 2000 }),

            name: chance.name(),
        },
        comments: BlogComment,
    },
    {
        id: chance.integer({ min: 1, max: 2000 }),
        title: 'How to Create a Birth Plan: A Step-by-Step Guide',
        content: chance.paragraph({ sentences: 2 }),
        coverImg: s3,
        createdAt: sub(new Date(), { days: 5, hours: 2, minutes: 20 }),
        view: random(9999),
        share: random(9999),
        category: 'Birth Planning',
        featured: false,
        author: {
            id: chance.integer({ min: 1, max: 2000 }),

            name: chance.name(),
        },
        comments: BlogComment,
    },
    {
        id: chance.integer({ min: 1, max: 2000 }),
        title: 'Managing Morning Sickness: Tips and Remedies',
        content: chance.paragraph({ sentences: 2 }),
        coverImg: s4,
        createdAt: sub(new Date(), { days: 7, hours: 6, minutes: 20 }),
        view: random(9999),
        share: random(9999),
        category: 'Health & Wellness',
        featured: false,
        author: {
            id: chance.integer({ min: 1, max: 2000 }),

            name: chance.name(),
        },
        comments: BlogComment,
    },
    {
        id: chance.integer({ min: 1, max: 2000 }),
        title: 'What to Pack in Your Hospital Bag: A Checklist',
        content: chance.paragraph({ sentences: 2 }),
        coverImg: s5,
        createdAt: sub(new Date(), { days: 4, hours: 6, minutes: 20 }),
        view: random(9999),
        share: random(9999),
        category: 'Delivery',
        featured: false,
        author: {
            id: chance.integer({ min: 1, max: 2000 }),

            name: chance.name(),
        },
        comments: BlogComment,
    },
    {
        id: chance.integer({ min: 1, max: 2000 }),
        title: 'Preparing for Labor: Exercises and Techniques',
        content: chance.paragraph({ sentences: 2 }),
        coverImg: s6,
        createdAt: sub(new Date(), { days: 2, hours: 6, minutes: 20 }),
        view: random(9999),
        share: random(9999),
        category: 'Labor & Delivery',
        featured: false,
        author: {
            id: chance.integer({ min: 1, max: 2000 }),

            name: chance.name(),
        },
        comments: BlogComment,
    },
    {
        id: chance.integer({ min: 1, max: 2000 }),
        title: 'Nutrition Tips for a Balanced Pregnancy Diet',
        content: chance.paragraph({ sentences: 2 }),
        coverImg: s7,
        createdAt: sub(new Date(), { days: 3, hours: 6, minutes: 20 }),
        view: random(9999),
        share: random(9999),
        category: 'Nutrition & Supplements',
        featured: false,
        author: {
            id: chance.integer({ min: 1, max: 2000 }),

            name: chance.name(),
        },
        comments: BlogComment,
    },
    {
        id: chance.integer({ min: 1, max: 2000 }),
        title: 'The Importance of Prenatal Care: What to Discuss with Your Doctor',
        content: chance.paragraph({ sentences: 2 }),
        coverImg: s8,
        createdAt: sub(new Date(), { days: 4, hours: 6, minutes: 20 }),
        view: random(9999),
        share: random(9999),
        category: 'Prenatal Care',
        featured: false,
        author: {
            id: chance.integer({ min: 1, max: 2000 }),

            name: chance.name(),
        },
        comments: BlogComment,
    },
    {
        id: chance.integer({ min: 1, max: 2000 }),
        title: 'Mental Wellness During Pregnancy: Stress Management Strategies',
        content: chance.paragraph({ sentences: 2 }),
        coverImg: s9,
        createdAt: sub(new Date(), { days: 5, hours: 3, minutes: 20 }),
        view: random(9999),
        share: random(9999),
        category: 'Mental Health',
        featured: true,
        author: {
            id: chance.integer({ min: 1, max: 2000 }),

            name: chance.name(),
        },
        comments: BlogComment,
    },
    {
        id: chance.integer({ min: 1, max: 2000 }),
        title: 'Understanding Fetal Development Week by Week',
        content: chance.paragraph({ sentences: 2 }),
        coverImg: s10,
        createdAt: sub(new Date(), { days: 0, hours: 1, minutes: 20 }),
        view: random(9999),
        share: random(9999),
        category: 'Fetal Development',
        featured: true,
        author: {
            id: chance.integer({ min: 1, max: 2000 }),

            name: chance.name(),
        },
        comments: BlogComment,
    },
];

mock.onGet('/api/data/blog/BlogPosts').reply(() => {
    return [200, BlogPost];
});

// ----------------------------------------------------------------------
mock.onPost('/api/data/blog/post').reply((config) => {
    try {
        const { title } = JSON.parse(config.data);
        const paramCase = (t) =>
            t
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');

        const post = BlogPost.find((_post) => paramCase(_post.title) === title);

        if (!post) {
            return [404, { message: 'Post not found' }];
        }

        return [200, { post }];
    } catch (error) {
        console.error(error);
        return [500, { message: 'Internal server error' }];
    }
});

mock.onPost('/api/data/blog/post/add').reply((config) => {
    try {
        const { postId, comment } = JSON.parse(config.data);
        const postIndex = BlogPost.findIndex((x) => x.id === postId);
        const post = BlogPost[postIndex];
        const cComments = post.comments || [];
        post.comments = [comment, ...cComments];
        return [200, { posts: [...BlogPost] }];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});