#!/bin/bash

# Help function to push a tag to GitHub remote origin.
# Pushing a tag triggers a GitHub Action workflow to publish to (Test)PyPI.
# Usage: ./push_tag.sh [pypi|testpypi]
# If no argument is provided, the default is testpypi.
# The version number is read from pyproject.toml file.
# The version number is prefixed with 'testv' for the testPyPI
# and 'v' for the (production) PyPI.

if [[ "$1" == "--help" || "$1" == "-h" ]]; then
    head  "$0" | grep '^#' | sed 's/^# //'
    exit 0
fi

# Default repository
repository="testpypi"
# Set a prefix for the version
version_prefix="testv"

# Check if the repository is provided
if [ "$1" ]
then
    # check that the repository is either testpypi or pypi
    if [ "$1" = "pypi" ]
    then
        repository="pypi"
        version_prefix="v"
    elif [ "$1" != "testpypi" ]
    then
        echo "Invalid repository. Please provide either 'testpypi' or 'pypi'"
        exit 1
    fi
fi

tag=$version_prefix$(grep version pyproject.toml | awk -F'"' '$0=$2')
echo "Intended repository: $repository"
echo command: git tag $tag
echo command: git push origin $tag
# verify that the user wishes to proceed
read -p "Do you want to proceed with pushing the tag? (y/n) "
if [[ "$REPLY" =~ ^[Yy]$ ]]; then
    git tag $tag
    git push origin $tag
else
    echo "Tag push cancelled."
    exit 0
fi
