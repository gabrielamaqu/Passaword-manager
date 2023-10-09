#!/bin/bash

### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'trybe-publisher' fornecido
## pela Trybe.

[[ $# == 1 ]] && \
[[ $1 == "trybe-security-parameter" ]] && \
git filter-repo \
  --path .trybe \
  --path .github \
  --path trybe.yml \
  --path trybe-filter-repo.sh \
  --path .npmrc \
  --path src/tests/01-title.test.tsx \
  --path src/tests/02-form.test.tsx \
  --path src/tests/03-render-form.test.tsx \
  --path src/tests/04-form-validation.test.tsx \
  --path src/tests/05-password-validation-display.test.tsx \
  --path src/tests/06-register-items.test.tsx \
  --path src/tests/07-delete-password-card.test.tsx \
  --path src/tests/08-hide-or-show-password.test.tsx \
  --path src/tests/09-form-hide-show-password.test.tsx \
  --path src/tests/10-alert-when-register.test.tsx \
  --path src/tests/utils.ts \
  --path README.md \
  --invert-paths --force --quiet
