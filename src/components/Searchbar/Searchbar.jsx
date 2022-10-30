import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import {
  SearchbarHeader,
  Form,
  SearchFormButton,
  ButtonLabel,
  Input,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export default function Searchbar({onSubmit}) {
  const [imageName, setImageName] = useState('');
 
  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      return toast.error('Please type something!');
    }

    onSubmit(imageName);
    setImageName('');
  };

    return (
      <SearchbarHeader>
        <Form onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <FaSearch />
            <ButtonLabel>Search</ButtonLabel>
          </SearchFormButton>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="imageName"
            value={imageName}
            onChange={handleNameChange}
          />
        </Form>
      </SearchbarHeader>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};