import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline }from "../src/components/Timeline";

function HomePage() {
    return(
        <>
            <CSSReset />       
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu />        
                <Header />
                <Timeline playlists={config.playlists} />        
            </div>
        </>
    );
  }
  
  export default HomePage;

  const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        margin-top: 20px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
  `;

  const StyledBanner = styled.div`
    background-image: url(${({ bnn })=> bnn});
    background-position: top;
    height: 400px;
  `;


  function Header(){
    return(
        
        <StyledHeader>
            <StyledBanner bnn={config.bnn} />

            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div> 
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
  }

  function Timeline(props){
    // console.log("Dentro do componente", props);
    const playlistsNames = Object.keys(props.playlists);

    return(
        <StyledTimeline>
            {playlistsNames.map((playlistsNames)=> {
                const videos = props.playlists[playlistsNames];
                return (
                    <section>
                        <h2>{playlistsNames}</h2>
                        <div>
                            {videos.map((video)=>{
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
  }