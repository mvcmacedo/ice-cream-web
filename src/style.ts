import styled from 'styled-components';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Header = styled.div`
  width: 100%;

  .header-item {
    display: flex;
    justify-content: center;
    min-width: 100%;
    padding: 2%;
  }
`;

export const Content = styled.div`
  width: 100%;
  padding: 2%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: center;
`;

export const Reviews = styled.div`
  .review-text {
    font-size: 0.8rem;
    margin: 1%;
  }
  .review-text-default {
    font-size: 0.7rem;
    margin: 2%;
  }
`;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: '25%',
      margin: 4,
    },
    media: {
      height: 'fit-content',
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);
