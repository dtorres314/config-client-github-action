# A Spring Cloud Config Server client Github Action 

This action loads configuration from a Spring Cloud Config Server instance as environment variables in a Github workflow. This Github Action assumes that the  Spring Cloud Config Server instance requires HTTP BASIC authentication. 

## Inputs

### `config-server-username`

**Required** The HTTP BASIC username

### `config-server-password`

**Required** The HTTP BASIC password. (You'll probably want to referene a value using `${{ secrets.* }}` here.


### `config-server-application-id`

**Required** The name of the application whose configuration we want to resolve. This migth correspond to a microservice or to a set of configuration tied to a specific Github Action. Typically this part refers to the root of the files managed by the Spring Cloud Config Server: given `foo.properties`, this would refer to `foo`.


### `config-server-profile`

**Required** Then name of the Spring profile to request data for. You might use profiles to distinguish production from development, etc. If you don't have a particular profile, specify `default`. 


### `config-server-uri`

**Required** The host where the Spring Cloud Config Server instance lives. 


### Behavior 

Once run, this will export all values in the Spring Cloud Config Server as environment variables (and so your keys in the configuration files should also be valid environment variables).

## Example usage

uses: joshlong/config-client-github-action@v31
with:
  config-server-username: ...
  config-server-password: ...
  config-server-application-id: ...
  config-server-profile: ...
  config-server-uri: ...
