import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline }from "../src/components/Timeline";

function HomePage() {

    const [valorDofiltro, setValorDoFiltro] = React.useState("");

    return(
        <>
            <CSSReset />       
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDofiltro={ valorDofiltro } setValorDoFiltro={ setValorDoFiltro }/>        
                <Header />
                <Timeline searchValue={ valorDofiltro } playlists={ config.playlists }>
                    Conteúdo
                </Timeline>       
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
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
  `;

const StyledBanner = styled.div`
background-image: url(${({ bnn }) => bnn});
background-position: 50% 46%;
height: 300px;
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

  function Timeline({searchValue, ...props}){
    const playlistsNames = Object.keys(props.playlists);

    return(
        <StyledTimeline>
            {playlistsNames.map((playlistsNames) => {
                const videos = props.playlists[playlistsNames];
                return (
                    <section key={playlistsNames}>
                        <h2>{playlistsNames}</h2>
                        <div>
                            {videos
                            .filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();

                                return titleNormalized.includes(searchValueNormalized)
                            })
                            .map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
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