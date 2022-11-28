# dotenv output action

This Github Action reads items from provided environment file (`.env`) and provides outputs with their values.

## Build history

[![Build history](https://buildstats.info/github/chart/sammcj/dotenv-output-action?branch=main)](https://github.com/sammcj/dotenv-output-action/actions)

## Inputs

- `path` - Override the path to the `.env` file. Default is `.env` in the repository root.
- `log-variables` - Log variables after reading from the `.env` file.
- `mask-variables` - Mask values after reading from the `.env` file.

## Outputs

- `generic` - Whatever is present in the `.env` file will be converted into an output variable.

E.g. you have the following `.env`:

```yaml
  VERSION=1.0
  AUTHOR=Mickey Mouse
```

Then you will have outputs:

- `version`: `1.0`
- `author`: `Mickey Mouse`

## Example usage

Assuming the following .env file:

```.env
hello=world
```

```yaml
- name: dotenv
  id: dotenv
  uses: sammcj/dotenv-output-action@main

- name: echo hello world
  run: echo "hello ${{ steps.dotenv.outputs.hello }}"
  # Will output "Hello world"
```

## Credits

- This is an updated fork from [falti/dotenv-action](https://github.com/falti/dotenv-action)
