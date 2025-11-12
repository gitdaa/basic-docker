<?php

namespace App\Hosxp\Controllers\Health;

// use App\Factories\Mocking\MockVnStat;

use App\Hosxp\Models\VnStat;
use App\Http\Controllers\Controller;

class VisitInfoController extends Controller
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

    public function visitInfo($vn)
    {

        $visit = VnStat::where('vn_stat.vn', '=', $vn)
            ->leftJoin('opdscreen', 'opdscreen.vn', '=', 'vn_stat.vn')
            ->leftJoin('health_screen', 'health_screen.vn', '=', 'vn_stat.vn')
            ->select(
                'vn_stat.vn',
                'vn_stat.vstdate',
                'vn_stat.hn',
                'vn_stat.age_y',
                'opdscreen.bw',
                'opdscreen.height',
                'opdscreen.bps',
                'opdscreen.bpd',
                'opdscreen.pulse',
                'opdscreen.bmi',
                'health_screen.health_check'
            )
            ->get();

        return response()
            ->json([
                'status' => 'ok',
                'data' => $visit,
            ]);
    }

}
