<?php

$file = file_exists('../config.json') ? '../config.json' : '../../config.json';
return json_decode(file_get_contents($file), true);

