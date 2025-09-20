<?php
$name = "millard";
$user = ["nickname" => "mil", "age" => 19, "language" => "English"];
function introduce($user, $name) {
    echo "Im " . $name . " my nickname is " . $user["nickname"] . " and I'm " . $user["age"] . " and speak " . $user["language"];
}

introduce($user, $name);