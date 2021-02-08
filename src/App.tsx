import React, { useState, useEffect, useCallback, useRef } from 'react';
import moment from 'moment';

import clsx from 'clsx';

import {
  TextField,
  Button,
  Avatar,
  Card,
  CardHeader,
  Typography,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  CircularProgress,
  Backdrop,
} from '@material-ui/core';

import {
  ExpandMore,
  Star,
  Link as LinkIcon,
  LocationOn,
  Phone,
} from '@material-ui/icons';

import Shop from './models/Shop';
import Review from './models/Review';

import api from './services/api';
import { Container, Header, Content, Reviews, useStyles } from './style';

function App() {
  const classes = useStyles();
  const [city, setCity] = useState<string | null>('Alpharetta');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [expandId, setExpandId] = useState(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const inputText = useRef({
    value: 'Alpharetta',
  });

  const handleExpandClick = useCallback(
    async (shopId) => {
      setLoading(true);
      try {
        if (shopId === expandId) {
          setExpandId(null);
          setReviews([]);
        } else {
          const shopReviews = await api.get(`/shops/${shopId}/reviews`);

          setReviews(shopReviews.data);
          setExpandId(shopId);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [expandId],
  );

  const handleSubmit = useCallback(() => {
    setCity(inputText.current.value || 'Alpharetta');
  }, []);

  useEffect(() => {
    setLoading(true);

    async function getShops() {
      const shopsResponse = await api.get(`/shops?location=${city}`);

      setShops(shopsResponse.data);
      setLoading(false);
    }

    getShops();
  }, [city]);

  return (
    <Container>
      <Backdrop className={classes.backdrop} open={loading} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Header>
        <div className="header-item">
          <TextField
            id="outlined-basic"
            defaultValue="Alpharetta"
            inputProps={{ ref: inputText }}
            label="Cidade"
            placeholder="Digite uma cidade"
            variant="outlined"
          />
        </div>

        <div className="header-item">
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Buscar
          </Button>
        </div>
      </Header>

      <Content>
        {!loading && !shops.length && (
          <Typography paragraph>
            Nenhuma sorveteria encontrada para essa cidade :(
          </Typography>
        )}

        {shops.length > 0 &&
          shops.map((shop) => (
            <Card key={shop.id} className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {`${shop.name.split(' ')[0].charAt(0)}`}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <Star />
                    {shop.rating}
                  </IconButton>
                }
                title={shop.name}
                subheader={shop.is_closed ? 'Fechado' : 'Aberto'}
              />

              <CardMedia
                className={classes.media}
                image={shop.image_url}
                title="Paella dish"
              />

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`${shop.review_count} Reviews.`}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton
                  aria-label="visit site"
                  href={shop.url}
                  target="blank"
                >
                  <LinkIcon />
                </IconButton>

                <IconButton
                  aria-label="location"
                  href={`https://maps.google.com?q=${shop.coordinates.latitude},${shop.coordinates.longitude}`}
                  target="blank"
                >
                  <LocationOn />
                </IconButton>

                <IconButton aria-label="phone">
                  <Phone />
                </IconButton>
                <span>{shop.display_phone}</span>

                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: shop.id === expandId,
                  })}
                  onClick={() => handleExpandClick(shop.id)}
                  aria-label="show more"
                >
                  <ExpandMore />
                </IconButton>
              </CardActions>

              {shop.id !== expandId && (
                <Reviews>
                  <Typography paragraph className="review-text-default">
                    Clique na seta ao lado para exibir as reviews do
                    estabelecimento.
                  </Typography>
                </Reviews>
              )}

              <Collapse in={shop.id === expandId}>
                <CardContent>
                  {reviews.map((review) => (
                    <Reviews>
                      <Typography paragraph className="review-user">
                        <CardHeader
                          avatar={
                            <Avatar
                              alt={review.user.name}
                              src={review.user.image_url}
                            />
                          }
                          action={
                            <IconButton
                              aria-label="settings"
                              href={review.url}
                              target="blank"
                            >
                              <Star />
                              {review.rating}
                            </IconButton>
                          }
                          title={review.user.name}
                          subheader={moment(review.time_created).format(
                            'DD/MM/YYYY HH:mm',
                          )}
                        />
                      </Typography>

                      <Typography paragraph className="review-text">
                        {review.text}
                      </Typography>
                    </Reviews>
                  ))}
                </CardContent>
              </Collapse>
            </Card>
          ))}
      </Content>
    </Container>
  );
}

export default App;
