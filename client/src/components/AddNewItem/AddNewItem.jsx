import React, { useState, useEffect } from "react";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';


const AddNewItem = ({ currentUser }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('goods')
  const [description, setDescription] = useState('')
  const [photos, setPhotos] = useState(null)

  const submitItem = async () => {

    let body = {
      owner: `${currentUser._id}`,
      name: name,
      type: type,
      description: description,
      image_link: ''
    }

    const reader = new FileReader();

    if (photos) {
      const file = document.querySelector('input[type=file]').files[0];
      reader.readAsDataURL(file);
    } else {
      axios.post(`/items/${currentUser._id}`, body)
      .then(res => console.log('New item added'))
    }

    reader.addEventListener('load', () => {
      let data = {
        data: reader.result,
        name: uuidv4()
      }
      axios.post('/imageupload', data)
        .then(res => {
            body.image_link = res.data
          axios.post(`/items/${currentUser._id}`, body)
            .then(res => console.log('New item added'))
        })
        .catch(err => console.log(err.message))
    })

    // const file = document.querySelector('input[type=file]').files[0];
    // reader.readAsDataURL(file);
  }

  return (
    <div className="add-new-item-container">
      <h3>What are you trading?</h3>
      <div className="add-new-item-form">
        <h4>Listing Title</h4>
        <input onChange={e => setName(e.target.value)} type="text" />
        <h4>Type</h4>
        <select onChange={e => setType(e.target.value)} name="" id="">
          <option value="goods">Goods</option>
          <option value="service">Service</option>
        </select>
        <h4>Description</h4>
        <textarea onChange={e => setDescription(e.target.value)} cols="110" rows="15"></textarea>
        <div className="add-photo-container">
          <h4>Add Photos</h4>
          <div className="new-item-photo">
          <input type="file" name="+" onChange={e => setPhotos(e.target.files[0])} className="custom-file-input"/>
        </div>
        <button onClick={submitItem} className="add-item-btn">Add Item</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewItem;
