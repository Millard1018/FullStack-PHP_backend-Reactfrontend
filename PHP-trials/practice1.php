<?php
$users = [
  ["name" => "Alice", "age" => 22, "language" => "PHP"],
  ["name" => "Bob", "age" => 17, "language" => "JavaScript"],
  ["name" => "Charlie", "age" => 25, "language" => "Python"]
];

function introduce(array $users): void{
    foreach ($users as $user) {
        try {
            if($user["age"] >= 18) {
                echo "Hi, I'm " . $user["name"] . ". I'm " . $user["age"] . " years old and I love " . $user["language"] . "\n";
            } 
            else if($user["age"] <= 17) {
                echo "Hi, I'm " . $user["name"] . ". I'm " . $user["age"] . " years old and I am still learning " . $user["language"] . "\n";
            } else {
                echo "not a valid age";
            } 
        } catch (Exception $e) {
            echo "Caught exception: " . $e->getMessage();
        }
    }
}

introduce($users);
