import React from "react";
import { NextSeo, ArticleJsonLd } from "next-seo";

interface PostSEO {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime: string;
  authors: User;
  tags: string[];
  image?: File;
}

const PostSEO: React.FC<PostSEO> = ({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  image = {
    url: `${process.env.NEXT_PUBLIC_URL}/images/og-image.jpg`,
    width: 850,
    height: 650,
    name: "Updev Community",
  },
}) => {
  function removeTags(str: string): string {
    if (str === null || str === "") return "";
    else str = str.toString(); // Regular expression to identify HTML tags in // the input string. Replacing the identified // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <>
      <NextSeo
        openGraph={{
          title,
          description: removeTags(description),
          url,
          type: "article",
          article: {
            publishedTime,
            modifiedTime,
            authors: [`${authors.firstName} ${authors.lastName}`],
            tags,
          },
          images: [
            {
              url: !image.url.startsWith("http") ? `${process.env.NEXT_PUBLIC_FILES_BASE_URL}${image.url}` : image.url,
              width: image.width,
              height: image.height,
              alt: image.name,
            },
          ],
        }}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={url}
        title={title}
        images={[`${process.env.NEXT_PUBLIC_API_URL}/assets/${image.url}`]}
        datePublished={publishedTime}
        dateModified={modifiedTime}
        authorName={`${authors.firstName} ${authors.lastName}`}
        description={description}
      />
    </>
  );
};

export default PostSEO;
