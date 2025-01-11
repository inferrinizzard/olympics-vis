#!/bin/bash

shouldDeleteImagesPage=0

# Check if the .env file exists
if [ -f ".env" ]; then
  # Load the .env file
  source .env
else
  shouldDeleteImagesPage=1
fi


if [ $ENVIRONMENT != "dev" ]; then
	shouldDeleteImagesPage=1
fi


if [ shouldDeleteImagesPage == 1 ]; then
	rm -r ../app/images
fi
