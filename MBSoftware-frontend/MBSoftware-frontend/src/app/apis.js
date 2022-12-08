import axios from 'axios';
import { useState } from 'react';

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
// myHeaders.append('Access-Control-Allow-Origin', "*")

// myHeaders.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');   
const baseURL = 'https://6a58-122-170-104-93.in.ngrok.io/'

// myHeaders.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS'); 

//Login API
//Post Request
export const handleLogin = (e, email, password) => {
    e.preventDefault();
    let raw = JSON.stringify({
        "email": email,
        "password": password
    });
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(baseURL + "auth/token/", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

//GET all applicants
export const getAllApplicants = async (page) => {

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const response = await fetch(baseURL + `form/?page=${page}`,requestOptions)
    const data = await response.json()
    return {
        data : data,
        status : response.status
    };
}

//GET new applications
export const getNewApplicantions = async (page) => {

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(baseURL + `form/new?page=${page}`,requestOptions)
    const data = await response.json()
    return data;
}

//GET updated applications
export const getUpdatedApplicantions = async (page) => {

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(baseURL + `form/updated?page=${page}`,requestOptions)
    const data = await response.json()
    return data;
}

//GET declined applications
export const getDeclinedApplicantions = async (page) => {

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(baseURL + `form/declined?page=${page}`,requestOptions)
    const data = await response.json()
    return data;
}

//GET paid applications
export const getPaidApplicantions = async (page) => {

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(baseURL + `form/paid?page=${page}`,requestOptions)
    const data = await response.json()
    return data;
}

//GET verified applications
export const getVerifiedApplications = async (page) => {

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(baseURL + `form/verified?page=${page}`,requestOptions)
    const data = await response.json()
    return data;
}

//GET filtered Admin applications
export const getFilteredAdminApplications = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch(baseURL + "form/admindashboardfilter", requestOptions)
    return response.text()
}
//GET filtered Agent applications
export const getFilteredAgentApplications = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch(baseURL + "form/agentdashboardfilter", requestOptions)
    return response.text()
}
//GET agentbucket list
export const getAgentBucket = async (page) => {

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(baseURL + `form/agentbucket?page=${page}`,requestOptions)
    const data = await response.json()
    return data;
}

//admin verify POST 

export const adminVerification = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch(baseURL + "form/verify", requestOptions)
    return response.json()
}

//agent verify PUT 

export const agentVerification = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch(baseURL + "form/agentbucket", requestOptions)
    return response.json()
}