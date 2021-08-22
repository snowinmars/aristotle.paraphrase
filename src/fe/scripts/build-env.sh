#!/bin/bash

# Recreate config file
touch ./env-config.js.gen
rm -rf ./env-config.js.gen
touch ./env-config.js.gen

touch .env.gen # created in Dockerfine build flow

# Add assignment
echo "window._env_ = {" >> ./env-config.js.gen

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ./env-config.js.gen
done < .env.gen

echo "}" >> ./env-config.js.gen
