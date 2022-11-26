import { useI18n } from "@/hooks/useI18n";
import useStore from "@/hooks/useStore";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import BusinessIcon from "@mui/icons-material/Business";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ManageAccounts from "@mui/icons-material/ManageAccountsSharp";
import QuestionAnswer from "@mui/icons-material/QuestionAnswerSharp";
import TagSharpIcon from "@mui/icons-material/TagSharp";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import React from "react";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

const LeftSideBar = () => {
  const user = useStore((state) => state.session?.user);
  const { route, push, locale } = useRouter();
  const matches = (path: string): boolean => `/${route.split("/")[1]}` === path;

  const switchLanguages = useI18n<"fr" | "en">();

  const toggleLang = () => {
    switchLanguages(locale === "fr" ? "en" : "fr");
  };

  const main = [
    { path: "/", icon: <HomeSharpIcon />, label: locale === "fr" ? "Accueil" : "Home" },
    { path: "/articles", icon: <HistoryEduIcon />, label: "Articles" },
    { path: "/posts", icon: <QuestionAnswer />, label: "Posts" },
    { path: "/tags", icon: <TagSharpIcon />, label: "Tags" },
    { path: "/blockchain", icon: <BlurOnIcon />, label: "Blockchain" },
    { path: "/top-posts", icon: <AutoAwesomeIcon />, label: "Top posts" },
    { path: "/home", icon: <BusinessIcon />, label: "Updev" },
  ];

  const params = [
    { path: "/bookmarks", icon: <BookmarkSharpIcon />, label: locale === "fr" ? "Favoris" : "Bookmarks" },
    // { path: "/settings", icon: <SettingsSharpIcon />, label: "Settings" },
    { path: "/profile", icon: <ManageAccounts />, label: locale === "en" ? "My account" : "Mon compte" },
  ];

  return (
    <>
      <List>
        {main.map(({ path, icon, label }) => (
          <ListItemButton key={path} selected={matches(path)} onClick={() => push(path)}>
            <ListItemIcon sx={{ mr: -1, color: matches(path) ? "primary.main" : "text.primary" }}>{icon}</ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                color: matches(path) ? "primary.main" : "text.primary",
                fontWeight: matches(path) ? 700 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {user && (
        <React.Fragment>
          <Divider />
          <List>
            {params.map(({ path, icon, label }) => (
              <ListItemButton key={path} selected={matches(path)} onClick={() => push(path)}>
                <ListItemIcon sx={{ mr: -1, color: matches(path) ? "primary.main" : "text.primary" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    color: matches(path) ? "primary.main" : "text.primary",
                    fontWeight: matches(path) ? 700 : 400,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </React.Fragment>
      )}
      <Button sx={{ display: { xs: "block", md: "none" }, ml: 1 }} variant="outlined" onClick={toggleLang}>
        {locale === "en" ? "French" : "Anglais"}
      </Button>
    </>
  );
};

export default LeftSideBar;
