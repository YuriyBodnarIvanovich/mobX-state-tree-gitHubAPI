import React from 'react';
import {inject, observer} from 'mobx-react';
import api from '../api';
import  Style from  './App.css';

function submit (event, store) {
  const {value} = event.target.querySelector('input')

  event.preventDefault()

  if (!value) {
    return
  }

  store.checkAddingAbility(value)

  if (!store.error) {
    api(`users/${value}`).then(store.addUser)
  }
}

const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function padLeadingZeros(num) {
  var s = num+"";
  if(s.length === 1){
    return "0" + s
  }
  return s;
}

const  App  = ({store}) => {
  
  function getDateInfo(){
      return "Joined " + padLeadingZeros(store.users[0].created_at.getDate()) + 
             " " +  monthNames[store.users[0].created_at.getMonth()]  + " " + store.users[0].created_at.getFullYear();
     
  }

  const styleData = {
    title:{},
    search:{},
    mainContainer:{},
  }

  if(store.users.length > 0){
    styleData.title= {
      width: store.users[0].bio !== null ? "531px" : null,
      
    }
    styleData.search= {
      width: store.users[0].bio !== null ? "531px" : null
    }
    styleData.mainContainer = {
      width: store.users[0].bio !== null ? "531px" : null,
      height:store.users[0].bio !== null ? "481px" : null,
    }
  }

  const themeStyle = {
    page:{
      background: store.theme ? "rgba(20,28,47,255)" : "#f5f8ff",
    },
    textColor:{
      color: store.theme ? "white" : "#b8bec7"
    },
    textColorBlack:{
      color: store.theme ? "white" : "black"
    },
    boxContainer:{
      background: store.theme ? "#1f2a48" : "#fefefe",
    },
    boxShadow:{
      boxShadow: store.theme ? null :  '12px 12px 2px 1px rgba(230,233,250,255)',

    },
    extraInfo:{
      background: store.theme ? "#141c2f" : "#f5f8ff",
    },
    textNotAvaliable:{
      color: store.theme ? "#d6d9e1" : "#D6D4D4",
    },
    loginText:{
      color:store.theme ? "#214b88": "#85b8df"
    }
  }


  return (
    <div className={Style.Page} style={themeStyle.page}>
      <div className={Style.Title} style={styleData.title}>
        <div>
          <h1 style={themeStyle.textColor}>devfinder</h1>
        </div>
       <div className={Style.changeThemeButton}>
        <p onClick={()=>{store.changeTheme(!store.theme)}} style={themeStyle.textColor}>{store.theme ? "LIGHT" : "DARK"}</p>
       </div>
      </div>
      <div className={Style.Search} style={{...styleData.search,...themeStyle.boxContainer, ...themeStyle.boxShadow}}>
        <img src="https://cdn4.iconfinder.com/data/icons/business-and-e-commerce/64/Find_profile-512.png"/>
        <form onSubmit={event => submit(event, store)} style={{display:'flex',...themeStyle.textColor}}>
          <input
            type='text'
            placeholder="Search GitHub username..."
            tabIndex='0'
            autoFocus
            style={{...themeStyle.boxContainer,...themeStyle.textColor}}
            />
          <button type='submit'>Search</button>
        </form>
      </div>
     {
       store.users.length > 0 ?
       <div className={Style.Content} style={{...styleData.mainContainer, ...themeStyle.boxContainer, ...themeStyle.boxShadow}}>
        <div className={Style.imgDiv}>
          <div className={Style.for_avatar}>
            <img src={store.users[0].avatar_url}/>
          </div>
          <div>
            <div className={Style.name_getStarted}>
              <h2 style={themeStyle.textColorBlack}>{store.users[0].name}</h2>
              {store.users[0].bio == null ? <p style={themeStyle.textColor}>{getDateInfo()}</p>: null}
            </div>
            <div className={Style.login_bio}>
              <p className={Style.loginText} style={themeStyle.loginText}>{store.users[0].login}</p>
              {store.users[0].bio == null ? <p className={Style.not_bio}>This profile has no bio.</p> : <p className={Style.name_getStarted} style={themeStyle.textColor}>{getDateInfo()}</p> }
            </div>
          </div>
        </div>
        <div className={Style.contentDiv} style={{marginLeft: store.users[0].bio !== null ? "0px" : null}}>
          <div>
            {store.users[0].bio !== null ? <p className={Style.bio_large}>{store.users[0].bio}</p> : null}
          </div>
          <div className={Style.extra_info} style={{ ...themeStyle.extraInfo}}>
            <div className={Style.extra_info_item}>
              <p>Repos</p>
              <b style={themeStyle.textColorBlack}>{store.users[0].public_repos}</b>
            </div>
            <div className={Style.extra_info_item}>
              <p>Followers</p>
              <b style={themeStyle.textColorBlack}>{store.users[0].folovers}</b>
            </div>
            <div className={Style.extra_info_item}>
              <p>Following</p>
              <b style={themeStyle.textColorBlack}>{store.users[0].following}</b>
            </div>
          </div>
          <div className={Style.location_etc}>
            <div className={Style.location_etc_item}>
              <div className={Style.links}>
                <div>
                  <img src="https://image.flaticon.com/icons/png/512/929/929426.png"/>
                </div>
                <div style={themeStyle.textNotAvaliable}>
                  {store.users[0].location !== null ? <p >{store.users[0].location}</p> :
                   <p>Not Available</p> }
                </div>
              </div>
              <div className={Style.links}>
                <div>
                  <img src="https://image.flaticon.com/icons/png/512/261/261854.png"/>
                </div>
                <div>
                <p style={themeStyle.textColor}>https://github.blog</p>
                </div>
              </div>
            </div>
            <div className={Style.location_etc_item}>
              <div className={Style.links}>
                <div>
                  <img src="https://image.flaticon.com/icons/png/512/733/733579.png"/>
                </div>
                <div style={themeStyle.textNotAvaliable}>
                  {store.users[0].twitter_username !== null ?  <p>{store.users[0].twitter_username}</p> :
                   <p>Not Available</p> }
                </div>
              </div>
              <div className={Style.links}>
                <div>
                  <img src="https://image.flaticon.com/icons/png/512/2544/2544087.png"/>
                </div>
                <div>
                  <p style={themeStyle.textColor}>@github</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      null
     }
    </div>
  )
}

export default inject('store')(
  observer(App)
)
