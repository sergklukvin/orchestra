import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  createBook,
  getAllBooks,
  updateBook,
} from '../../services/http.service';
import { useForm } from 'react-hook-form';
import './Form.scss';
import { Redirect } from 'react-router-dom';
import { AlertBar } from '../Alert/AlertBar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
  mainBlock: {
    marginTop: 30,
    marginBottom: 30,
  },
  btn: {
    color: 'white',
  },
  btnSubmit: {
    cursor: 'pointer'
  }
}));

export default function MultilineTextFields(props) {
  let curId = '';
  const classes = useStyles();
  const book = props.book;
  const [redirect, setRedirect] = useState(false);
  const [alertMeta, setAlertMeta] = useState({ severity: '', message: '' });
  const [isListManipulated, setListManipulated] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    if (props.book.id !== '') {
      updateBook(props.book.id, {
        id: props.book.id,
        title: data.title,
        author: data.author,
        category: data.category,
        isbn: data.isbn,
      })
        .then(() => showAlert('success', 'Update success'))
        .catch(() => showAlert('error', 'Update failed'))
        .then(
          setTimeout(() => {
            setRedirect(true);
          }, 1000)
        );
    } else {
      getAllBooks()
        .then((res) => (curId = res.data[res.data.length - 1].id + 1))
        .then(
          createBook({
            id: curId,
            title: data.title,
            author: data.author,
            category: data.category,
            isbn: data.isbn,
          })
        )
        .then(() => showAlert('success', 'Create success'))
        .catch(() => showAlert('success', 'Create success'))
        .then(
          setTimeout(() => {
            setRedirect(true);
          }, 1000)
        )
    }
  };

  const showAlert = (severity, message) => {
    setListManipulated(true);
    setAlertMeta({ severity, message });
    setAlertOpen(true);

    setTimeout(() => {
      handleAlertClose();
    }, 2000);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  if (redirect) {
    return (
      <div>
        <Redirect to='/' />
      </div>
    );
  }

  return (
    <>
      <AlertBar
        open={isAlertOpen}
        onClose={handleAlertClose}
        alertMeta={alertMeta}
      />

      <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        <input
          name='title'
          ref={register({ required: true })}
          placeholder='Title'
          defaultValue={book.title}
        />
        {errors.title && <p>Field 'Title' is required</p>}

        <input
          name='author'
          ref={register({ required: true })}
          placeholder='Author'
          defaultValue={book.author}
        />
        {errors.author && <p>Field 'Author' is required</p>}

        <select
          name='category'
          ref={register({ required: true })}
          defaultValue={book.category}
        >
          <option value=''>Select...</option>
          <option value='action'>action</option>
          <option value='thriller'>thriller</option>
          <option value='comedy'>comedy</option>
        </select>
        {errors.category && <p>Field 'Category' is required</p>}

        <input
          name='isbn'
          type='number'
          ref={register({ required: true })}
          placeholder='isbn'
          defaultValue={book.isbn}
        />
        {errors.isbn && <p>Field 'ISBN' is required</p>}
        <input type='submit' value='SUBMIT' className={classes.btnSubmit} />
      </form>
    </>
  );
}
