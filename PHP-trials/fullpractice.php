
<?php
    $firstName = "Millard";
    $lastName = "Lirio";
    $fullName = "{$firstName} {$lastName}";

    $subjects = ["Mathematics", "Science", "Language", "History", "Physical Education"];
    $grades = [99, 98, 97, 96, 95];

    //associative array/objects
    $student = ["name" => $fullName, "age"=> 19, "subjects"=> $subjects];

    if ($student["age"] < 18) {
        echo "Minor";
    } else if($student["age"] == 18) {
        echo "Just turned adult";
    } else {
        echo "Adult";
    }

    function averageCalculator($grades) {
        $average = array_sum($grades) / count($grades);
        return $average;
    }

    class Student {
        public $name;
        public $age;
        public $grades;

        function __construct($name, $age, $grades)
        {
            $this->name = $name;
            $this->age = $age;
            $this->grades = $grades;
        }

        function getAverage() {
            return averageCalculator($this->grades);
        }

        function introduce() {
            echo "\nHi, I'm {$this->name}, age {$this->age}, and my average grade is {$this->getAverage()}";
        }
    }

    $stud = new Student($fullName, $student["age"], $grades);
    $stud->introduce();
?>