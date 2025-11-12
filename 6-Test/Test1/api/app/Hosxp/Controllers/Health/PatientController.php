<?php

namespace App\Hosxp\Controllers\Health;

// use App\Factories\Mocking\MockVnStat;

use App\Hosxp\Models\Patient;
use App\Http\Controllers\Controller;

class PatientController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function patientInfo($hn)
    {
        //sleep(1);
        $patient = Patient::where('hn', '=', $hn)->firstOrFail();

        $data = [
            'vn' => null,
            'hn' => $patient->hn,
            'cid' => $patient->cid,
            'pname' => $patient->pname,
            'fname' => $patient->fname,
            'lname' => $patient->lname,
            'patient_name' => $patient->pname . $patient->fname . " " . $patient->lname,
            'birthday' => $patient->birthday,
            'sex' => $patient->sex,
        ];

        return response()
            ->json([
                'status' => 'ok',
                'data' => [$data],
            ]);
    }

}
