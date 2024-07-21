import React from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import BlogListing from 'src/components/apps/blog/BlogListing';

const Blog = () => {
  return (
    <PageContainer title="Blog" description="this is Blog page">
      <Breadcrumb title="Blog" subtitle="Get the best pregnancy tips" />
      {/* ------------------------------------------- */}
      {/* Blog Listing */}
      {/* ------------------------------------------- */}
      <BlogListing />
    </PageContainer>
  );
};

export default Blog;
