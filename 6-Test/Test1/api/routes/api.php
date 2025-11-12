<?php

use Dingo\Api\Routing\Router;

/** @var Router $api */
$api = app(Router::class);

$api->version('v1', function (Router $api) {

    $api->group(['prefix' => 'health', 'namespace' => 'App\\Hosxp\\Controllers\\Health'], function (Router $health) {
        $health->get('patient-info/{hn}', 'PatientController@patientInfo');
        $health->get('patient-visit/{hn}', 'VisitListController@visitList');
        $health->get('visit-info/{vn}', 'VisitInfoController@visitInfo');
        $health->get('exam/{vn}', 'ExamController@getExam');
        $health->post('exam', 'ExamController@updateExam');
        $health->get('lab-result/{vn}', 'HealthLaboratoryController@getLabResult');
    });

    $api->any('/time', function () {
        return date('Y-m-d H:i:s');
    });

});
