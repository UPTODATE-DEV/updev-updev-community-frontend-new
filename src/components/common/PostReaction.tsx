import useSocket from "@/hooks/useSocket";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import { patchRequest } from "@/lib/api";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import Dialog from "@mui/material/Dialog";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Like, Love, Useful } from "./Reactions";
import ShowPostReactions from "@/components/posts/ShowPostReactions";
dayjs.extend(relativeTime);

const PostReaction = ({ userId, post }: { userId?: string; post: Post }) => {
  const [openReaction, setOpenReaction] = React.useState(false);
  const { setOpenLoginModal } = useStoreNoPersist();
  const [userReaction, setUserReaction] = React.useState<ArticleReactionType | undefined>();
  const socket = useSocket();
  const { locale } = useRouter();

  const handleCloseReaction = () => {
    setOpenReaction(false);
  };

  const onReact = async (type: ArticleReactionType) => {
    if (userId) {
      setUserReaction((state) => (state ? undefined : type));
      await patchRequest({ endpoint: `/posts/${post?.id}/reactions/${type}/${userId}/article` });
      socket.emit("notification", { notificationFromUser: userId, id: Date.now().toString(), post, type });
      return;
    }
    setOpenLoginModal(true);
  };

  const reaction = () => {
    switch (userReaction) {
      case "LIKE":
        return <Like liked handleClick={onReact} />;
      case "LOVE":
        return <Love handleClick={onReact} />;
      case "USEFUL":
        return <Useful handleClick={onReact} />;

      default:
        return (
          <>
            <Like handleClick={onReact} />
            <Love handleClick={onReact} />
            <Useful handleClick={onReact} />
          </>
        );
    }
  };

  useEffect(() => {
    if (userId) {
      const reaction = post?.article?.reactions?.find((reaction) => {
        return reaction?.user?.id === userId;
      });
      if (reaction) {
        setUserReaction(reaction.type);
      }
    }
  }, [userId]);

  return (
    <>
      <Dialog
        open={openReaction}
        maxWidth="md"
        onClose={handleCloseReaction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ShowPostReactions reactions={post?.article?.reactions} />
      </Dialog>
      <Stack direction="row" alignItems="center">
        {reaction()}
        <Tooltip title={locale === "en" ? "See all reactions" : "Voir toutes les réactions"} placement="bottom" arrow>
          <IconButton onClick={() => setOpenReaction(true)}>
            <Typography variant="caption" color="text.primary" fontWeight={700}>
              {post.article?.reactions?.length}
            </Typography>
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );
};

export default PostReaction;
