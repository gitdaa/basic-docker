<?php

namespace App\Hosxp\Controllers\Health;

// use App\Factories\Mocking\MockVnStat;

use App\Hosxp\Models\VnStat;
use App\Http\Controllers\Controller;

class VisitListController extends Controller
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

    public function visitList($hn)
    {

        $visit = VnStat::where('vn_stat.hn', '=', $hn)
            ->leftJoin('health_screen', 'health_screen.vn', '=', 'vn_stat.vn')
            ->leftJoin('nkph_health_exam', 'nkph_health_exam.vn', '=', 'vn_stat.vn')
            ->select('vn_stat.vn', 'vn_stat.vstdate', 'vn_stat.hn', 'health_screen.health_check', 'nkph_health_exam.health_exam_id')
            ->orderBy('vn_stat.vn', 'desc')
            ->take(100)
            ->get();

        return response()
            ->json([
                'status' => 'ok',
                'data' => $visit,
            ]);
    }

}
