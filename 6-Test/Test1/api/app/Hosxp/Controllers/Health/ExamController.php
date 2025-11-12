<?php

namespace App\Hosxp\Controllers\Health;

// use App\Factories\Mocking\MockVnStat;

use App\Hosxp\Models\Nkph\NkphHealthExam;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ExamController extends Controller
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

    public function getExam($vn)
    {
        $exam = NkphHealthExam::firstOrNew(['vn' => $vn]);

        return response()
            ->json([
                'status' => 'ok',
                'data' => [$exam],
            ]);
    }

    public function updateExam(Request $request)
    {

        $exam = NkphHealthExam::firstOrCreate(['vn' => $request->input('vn')]);
        $exam->company = $request->input('company');

        $exam->va_left = $request->input('va_left');
        $exam->va_right = $request->input('va_right');
        $exam->va_left_correct = $request->input('va_left_correct');
        $exam->va_right_correct = $request->input('va_right_correct');

        $exam->glasses = $request->input('glasses', null);

        $exam->extraocular_normal = $request->input('extraocular_normal');
        $exam->extraocular_abnormal_text = $request->input('extraocular_abnormal_text');
        if ($request->input('extraocular_normal') == "Y") {
            $exam->extraocular_abnormal_text = "";
        }

        $exam->stereropsis_normal = $request->input('stereropsis_normal');
        $exam->stereropsis_abnormal_text = $request->input('stereropsis_abnormal_text');
        if ($request->input('stereropsis_normal') == "Y") {
            $exam->stereropsis_abnormal_text = "";
        }

        $exam->visual_field_normal = $request->input('visual_field_normal');
        $exam->visual_field_abnormal_text = $request->input('visual_field_abnormal_text');
        if ($request->input('visual_field_normal') == "Y") {
            $exam->visual_field_abnormal_text = "";
        }

        $exam->color_normal = $request->input('color_normal');
        $exam->color_abnormal_text = $request->input('color_abnormal_text');
        if ($request->input('color_normal') == "Y") {
            $exam->color_abnormal_text = "";
        }

        $exam->audio_left_normal = $request->input('audio_left_normal');
        $exam->audio_left_abnormal_text = $request->input('audio_left_abnormal_text');
        if ($request->input('audio_left_normal') == "Y") {
            $exam->audio_left_abnormal_text = "";
        }

        $exam->audio_right_normal = $request->input('audio_right_normal');
        $exam->audio_right_abnormal_text = $request->input('audio_right_abnormal_text');
        if ($request->input('audio_right_normal') == "Y") {
            $exam->audio_right_abnormal_text = "";
        }

        $exam->pulmonary_normal = $request->input('pulmonary_normal');
        $exam->pulmonary_abnormal_text = $request->input('pulmonary_abnormal_text');
        if ($request->input('pulmonary_normal') == "Y") {
            $exam->pulmonary_abnormal_text = "";
        }

        $exam->cbc_normal = $request->input('cbc_normal');
        $exam->cbc_abnormal_text = $request->input('cbc_abnormal_text');
        if ($request->input('cbc_normal') == "Y") {
            $exam->cbc_abnormal_text = "";
        }

        $exam->ua_normal = $request->input('ua_normal');
        $exam->ua_abnormal_text = $request->input('ua_abnormal_text');
        if ($request->input('ua_normal') == "Y") {
            $exam->ua_abnormal_text = "";
        }

        $exam->stool_normal = $request->input('stool_normal');
        $exam->stool_abnormal_text = $request->input('stool_abnormal_text');
        if ($request->input('stool_normal') == "Y") {
            $exam->stool_abnormal_text = "";
        }

        $exam->hbsag = $request->input('hbsag');
        $exam->antihb = $request->input('antihb');
        $exam->antihav = $request->input('antihav');
        $exam->vdrl = $request->input('vdrl');

        $exam->chest_normal = $request->input('chest_normal');
        $exam->chest_abnormal_text = $request->input('chest_abnormal_text');
        if ($request->input('chest_normal') == "Y") {
            $exam->chest_abnormal_text = "";
        }

        $exam->ekg_normal = $request->input('ekg_normal');
        $exam->ekg_abnormal_text = $request->input('ekg_abnormal_text');
        if ($request->input('ekg_normal') == "Y") {
            $exam->ekg_abnormal_text = "";
        }

        $exam->additional_text = $request->input('additional_text');
        $exam->summary_text = $request->input('summary_text');
        $exam->save();

        return response()
            ->json([
                'status' => 'ok',
                'data' => [$exam],
            ]);
    }

}
