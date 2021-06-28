import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    maxWidth: 400,
    textAlign: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 2,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));

const Keynote = (keynote) => {
  const styles = useStyles();

  const { image, name, organization } = keynote.keynote;

  return (
    <Card className={cx(styles.card)}>
      <CardContent>
        <Avatar className={styles.avatar} src={image} />
        <h3 className={styles.heading}>{name}</h3>
        <span className={styles.subheader}>{organization}</span>
      </CardContent>
      <CardActions>
        <Button size='small' variant='contained' color='secondary'>
          Edit
        </Button>

        <Button size='small' variant='contained' color='secondary'>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Keynote;
