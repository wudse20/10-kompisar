"use strict";
function generateRandomNumber(max) 
{
    return Math.floor(Math.random() * max);
}

function generateRandomRange(min, max)
 {
    return Math.floor(Math.random() * (max - min) + min);
 }