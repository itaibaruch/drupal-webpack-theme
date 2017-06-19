# drupal-webpack-theme

Fast developing theme using Webpack2 + HMR + Yarn

## Before starting, make sure you have the following installed on the machine
1. NodeJs =>  ``` brew install node ```
2. Yarn =>  ``` brew install yarn ```

## installation 
###### install all dependencies 
``` yarn ```

###### go to the folder sites/default:

create/edit services.yml 
```
parameters:
    twig.config:
        debug: true
        auto_reload: true
        cache: false
```
uncomment in settings.php
```
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}
```

add the line to settings.local.php
```
// set global flag for development
$settings['dw_env_dev'] = TRUE;
```

if that files does't exist create one with the same name, and add 
```
<?php
    // set global flag for development
    $settings['dw_env_dev'] = TRUE;
?>
```


###### start development mode
``` npm start ```

###### build for production use
``` npm run build ```

###### js list the code
``` npm run list ```

###### generate docs
``` npm run docs ```


## Changelog
###### version 1.0.2
  1. Update webpack config file
  
  
###### version 1.0.1
  1. Add jsDoc
  2. Add Eslint

  
###### version 1.0.0
  1. Init project
  2. Current stack - Yarn + Webpack 2 (with HMR) + bootstrap + scss + Js ES5 (option to add babel for ES2016/7)