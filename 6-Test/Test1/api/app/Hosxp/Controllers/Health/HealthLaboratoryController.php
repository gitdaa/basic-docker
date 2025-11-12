<?php

namespace App\Hosxp\Controllers\Health;

// use App\Factories\Mocking\MockVnStat;

use App\Hosxp\Models\LabHead;
use App\Hosxp\Models\VnStat;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class HealthLaboratoryController extends Controller
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

    public function getLabResult($vn)
    {

        $visit = VnStat::where('vn', '=', $vn)->first();
        $inday = VnStat::where('vstdate', '=', $visit->vstdate)
            ->where('hn', '=', $visit->hn)
            ->select('vn')
            ->get();

        $data = LabHead::whereIn('lab_head.vn', $inday->pluck('vn'))
            ->join('lab_order', 'lab_order.lab_order_number', '=', 'lab_head.lab_order_number')
            ->join('lab_items', 'lab_items.lab_items_code', '=', 'lab_order.lab_items_code')
            ->leftJoin('nkph_tmlt_group', 'nkph_tmlt_group.tmlt_code', '=', 'lab_items.tmlt_code')
            ->whereIn('lab_items.tmlt_code', [
                '320062', '320131', '320080', '320052', '320055', '320026', '320032', '320006',
                '310027', '320031', '320070', '320071', '320072', '320073', '308038', '300011',
                '320150', '320151', '320109', '320050', '308067', '320150', '320151', '320109',
                '310039', '310047', '350479', '300022', '350160',
                '320268', '320294', '300089', '300106', '330094', '300209', '320311', '320165', '310006'])
            ->whereNotNull('lab_order.lab_order_result')
            ->select(
                'lab_items.tmlt_code',
                'nkph_tmlt_group.group_name',
                DB::raw('group_concat(distinct lab_items.lab_items_code) as lab_items_code'),
                DB::raw('group_concat(distinct lab_items.lab_items_name) as lab_items_name'),
                DB::raw('group_concat("[",lab_head.order_date,"@", lab_order.lab_order_result,"]" SEPARATOR "|") as lab_order_result')
            )
            ->groupBy('lab_items.tmlt_code')
            ->orderBy('lab_items.tmlt_code', 'asc')
            ->get()
            ->transform(function ($item) {
                $lab = trim($item->lab_order_result, '[]');
                $lab = explode("]|[", $lab);

                $lab_result = collect($lab)->transform(function ($tranf) {
                    $raw = explode("@", $tranf);
                    return [
                        'order_date' => isset($raw[0]) ? $raw[0] : '',
                        'lab_order_result' => isset($raw[1]) ? $raw[1] : '',
                    ];
                });

                return [
                    "tmlt_code" => $item->tmlt_code,
                    'group_name' => $item->group_name,
                    "lab_items_code" => $item->lab_items_code,
                    "lab_items_name" => $item->lab_items_name,
                    "lab_order_result" => $lab_result,
                ];
            });

        return response()
            ->json([
                'status' => 'ok',
                'data' => $data,
            ]);
    }

}
