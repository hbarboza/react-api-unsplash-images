import { useState } from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";

const AppStyled = styled.div`
  header {
    display: flex;
    justify-content: center;
    background-color: var(--white);
    padding: 22px;
    box-shadow: 1px 2px 5px rgb(0, 0, 0, 0.3);
    z-index: 2;
    position: relative;    
  }
  input {
    outline: none;
    border: solid 1px #ccc;
    padding: 10px 15px;
    border-radius: 4px;
    min-width: 300px
  }

  .container{
    display: flex;
    background-color: #eee;
    justify-content: center;
  }

  .center{
    width: 1200px;
    column-count: 3;
  }

  article{
    width: 370px;
    display: inline-block;
    transition: box-shadow 0.2s ease;
    margin: 40px 10px 0 10px;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }

  article > img{
    width: inherit;
    border-radius: 5px 5px 0 0
  }

  article > p{
    margin: 10px 15px;
  }

  article:hover{
    box-shadow: 0px 3px 5px rgb(0,0,0,0.2);
  }
`;

function App() {

  const [pictures, setPictures] = useState([]);
  const open = url => window.open(url)  

  //console.log({ pictures });

  const picturesList = pictures.map( picture => {
    return (
      <article key={picture.id} onClick={() => open(picture.links.html)}>
        <img src={picture.urls.regular} alt="" />
        <p>{[picture.description, picture.alt_description].join(" · ")}</p>
      </article>
    );
  })

  return (
    <AppStyled>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async values => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?page=1&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID RlZ88Ecb3s2yhzAShSym5FJfGPenmtBJhTRE-C-Pe3Y"
                }
              }
            );
            const data = await response.json();
            setPictures(data.results);
          }}
        >
          <Form>
            <Field name="search" placeholder="Define your category and press enter"></Field>
          </Form>
        </Formik>
        
      </header>
      <div className="container">
        <div className="center">{picturesList}</div>
      </div>
    </AppStyled>
  );
}

export default App;
