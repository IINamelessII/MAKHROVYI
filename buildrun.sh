#!/bin/bash
git pull
cd frontend
npm run build
cd ../
source backend/venv/bin/activate
python backend/manage.py runserver
