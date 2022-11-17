import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { CallToActionSkeleton } from "../middle/Skeleton";

const data = [
  {
    title: "Ready to join the community?",
    description: "Create your account now or use an existing one",
    buttons: [
      { name: "Create account", path: "/signup" },
      { name: "Log in", path: "/signin" },
    ],
    about: "Room for developers to connect, learn, share skills and knowledge and grow as a community",
  },
  {
    title: "Prêt à rejoindre la communauté?",
    description: "Créez votre compte maintenant ou utilisez-en un existant",
    buttons: [
      { name: "Créer un compte", path: "/signup" },
      { name: "Se connecter", path: "/signin" },
    ],
    about:
      "Plateforme d’échange et de connection entre développeurs pour partager et améliorer leurs compétences et connaissances et grandir en tant que communauté",
  },
];

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});

const Footer = () => {
  const [openLogin, setOpenLogin] = React.useState(false);

  const { locale } = useRouter();
  const { title, description, buttons, about } = data[locale === "en" ? 0 : 1];

  const navigations = [
    { name: locale === "en" ? "Home" : "Accueil", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Posts", path: "/posts" },
  ];

  const ressources = [{ name: "Updev", path: "http://updev.africa" }];

  const terms = [
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy policy", path: "/policy" },
  ];

  return (
    <Box sx={{ bgcolor: "action.hover" }}>
      <Container sx={{ py: 4 }}>
        <Stack spacing={4}>
          <Stack spacing={4} direction={{ xs: "column", md: "row" }} justifyContent="space-between">
            <Stack spacing={2}>
              <Typography variant="h4" textAlign={{ xs: "center", md: "left" }} color="text.primary">
                {title}
              </Typography>

              <Typography textAlign={{ xs: "center", md: "left" }} color="text.secondary">
                {description}
              </Typography>
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                onClick={() => setOpenLogin(true)}
                disableElevation={true}
                color="primary"
                sx={{ px: 4, py: 1 }}
              >
                {buttons[0].name}
              </Button>
              <Button onClick={() => setOpenLogin(true)} sx={{ px: 4, py: 1 }}>
                {buttons[1].name}
              </Button>
            </Stack>
          </Stack>
          <Divider />

          <Box>
            <Grid container spacing={{ xs: 2, md: 6 }}>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack spacing={2}>
                  <Stack sx={{ width: 180, height: 90, position: "relative" }}>
                    <Image src="/logo.svg" layout="fill" objectFit="contain" />
                  </Stack>
                  <Typography color="text.secondary">{about}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={2.5}>
                <Stack>
                  <Typography variant="h6" color="text.primary" fontSize={14} component="span" sx={{ py: 2 }}>
                    NAVIGATIONS
                  </Typography>
                  {navigations.map((el) => (
                    <Stack
                      direction="row"
                      key={el?.path}
                      alignItems="center"
                      spacing={1}
                      sx={{
                        color: "text.secondary",
                        "&:hover": { color: "primary.main" },
                        py: 0.5,
                      }}
                    >
                      <a href={el?.path} target="_blank" rel="noreferrer noopener">
                        <Typography component="a" gutterBottom>
                          {el.name}
                        </Typography>
                      </a>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={2.5}>
                <Stack>
                  <Typography variant="h6" color="text.primary" fontSize={14} component="span" sx={{ py: 2 }}>
                    {locale == "fr" ? "RESSOURCES" : "RESOURCES"}
                  </Typography>
                  {ressources.map((el) => (
                    <Stack
                      direction="row"
                      key={el?.path}
                      alignItems="center"
                      spacing={1}
                      sx={{
                        color: "text.secondary",
                        "&:hover": { color: "primary.main" },
                        py: 0.5,
                      }}
                    >
                      <a href={el?.path} target="_blank" rel="noreferrer noopener">
                        <Typography component="a" gutterBottom>
                          {el.name}
                        </Typography>
                      </a>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={2.5}>
                <Stack>
                  <Typography variant="h6" color="text.primary" fontSize={14} component="span" sx={{ py: 2 }}>
                    CONTACT
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "primary.main" },
                      py: 0.5,
                    }}
                  >
                    <a href="mailto:contact@uptodatedevelopers.com" target="_blank" rel="noreferrer noopener">
                      <Typography component="a" gutterBottom>
                        contact@uptodatedevelopers.com
                      </Typography>
                    </a>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Typography color="text.secondary" variant="caption" component="p" textAlign="center" sx={{ pt: 4 }}>
            &copy; Updev Community {new Date().getFullYear()}. All rights reserved. Designed by{" "}
            <Typography
              color="secondary.main"
              variant="caption"
              component="a"
              href="https://uptodatedevelopers.com"
              target="_blank"
            >
              Uptodate Developers.{" "}
            </Typography>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
