#!/bin/bash
react-scripts start &
json-server --watch db.json --port 8080 &
