import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS, QUERY_USER } from "../utils/queries";
const SignedIn = Auth.loggedIn() ? true : false;

const ProjectView = ({ project, authEditor, toggleEdit }) => {

  const creatorId = project.projectCreator;
  const { loading, data } = useQuery(
    //Change query for project user
    QUERY_USER, {
    variables: { userId: creatorId },
  });

  // console.log(project.projectCreator);


  let user;
  if (data ? true : false) {
    user = data?.singleUser || {};
  }

  const linkStyle = {
    color: "white",
    textDecoration: 'none'
  }

  if (project ? true : false) {
    console.log(project.goFundMe)

  }



  //Format discord link
  const discordLink = project.discord.split('discord.com')
  let discordValue;
  if(discordLink[0] === 'https://' || discordLink[0] === 'https://www.') {
      if(project.discord && discordLink.length === 2) {
          discordValue = project.discord
      }
  }
  if(project.discord && !discordLink[0]) {
      discordValue  = `https://${project.discord}`
  }



  //Format go fund me link
  const gofundmeLink = project.goFundMe.split('gofundme.com')
  let gofundmeValue;
  if(gofundmeLink[0] === 'https://' || gofundmeLink[0] === 'https://www.') {
      if(project.goFundMe && gofundmeLink.length === 2) {
          gofundmeValue = project.goFundMe
          console.log(1)
      }
  }
  if(project.goFundMe && !gofundmeLink[0]) {
      gofundmeValue = `https://${project.goFundMe}`
      console.log(2)
  }

  console.log(gofundmeLink)

  return (
    <div>
      {loading ? (
        <div>
          <span className="loader">Load&nbsp;ng</span>
        </div>
      ) : (
        <div key={project._id} style={linkStyle}>
          <div className="container">
            <div>
              <h1>{project.projectName}</h1>
              <h4>Main Developer: {user.username}</h4>
              <img alt="" src={project.image} id="displayImage" />
              <div>
                <h2>{project.description}</h2>
              </div>
              <div>
                {project.discord ? (
                  <a href={discordValue} target="_blank">
                    Discord Link
                  </a>
                ) : (
                  <p></p>
                )}
                  <p> </p>
                {project.goFundMe ? (
                  <a href={gofundmeValue} target="_blank">
                    GoFundMe Page
                  </a>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
          {authEditor ? <button className="btn" onClick={toggleEdit}>Edit Page</button> : <div></div>} 
        </div>
        
      )}
    </div>
  );
};

export default ProjectView;