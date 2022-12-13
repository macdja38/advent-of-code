; ModuleID = 'day6_original.cb5bc32e-cgu.0'
source_filename = "day6_original.cb5bc32e-cgu.0"
target datalayout = "e-m:w-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-pc-windows-msvc"

%"core::fmt::Arguments" = type { { ptr, i64 }, { ptr, i64 }, { ptr, i64 } }

@vtable.0 = private unnamed_addr constant <{ ptr, [16 x i8], ptr, ptr, ptr }> <{ ptr @"_ZN4core3ptr85drop_in_place$LT$std..rt..lang_start$LT$$LP$$RP$$GT$..$u7b$$u7b$closure$u7d$$u7d$$GT$17he674485e52550e2eE", [16 x i8] c"\08\00\00\00\00\00\00\00\08\00\00\00\00\00\00\00", ptr @"_ZN4core3ops8function6FnOnce40call_once$u7b$$u7b$vtable.shim$u7d$$u7d$17h4322647d90c166d2E", ptr @"_ZN3std2rt10lang_start28_$u7b$$u7b$closure$u7d$$u7d$17h9493f05d19f83e0bE", ptr @"_ZN3std2rt10lang_start28_$u7b$$u7b$closure$u7d$$u7d$17h9493f05d19f83e0bE" }>, align 8
@alloc5 = private unnamed_addr constant <{}> zeroinitializer, align 8
@alloc53 = private unnamed_addr constant <{ [4095 x i8] }> <{ [4095 x i8] c"cmpmbppqmqsqzzrrswrrnqrnqqjzjvzzqvzvjvnnlclrrjhrrrnggmgwwdhhfttmmjrjzrzrhrbrgbrbsbjbcjjvpjjcvjvttfwffjtffqqqldqllhthhljhllfffbfbzbczzznmznnrrtgrgppdcppdfpfjjrggpjgjwgjwgghdggzzshzhrhttmhhdqhqsqgglhljjbggjhggfsfvfggrmggwwbwvvwssqtqzqlqvlqqvtthjhjrjssclscsszhzbztbbdhdbbqfbqqvdqdjjjspsqslsnlljnljjhttdtbdttjpjggtfftlldpdzzqhzqqcwwvggmgmppmhpmpddgjjbzbmzmllndldblbwbswsbbmzzwnnpdndzznmnjnjmnnzwwrqwrqrvqvqmmbmhmzzdqqfnqqgnqqfppmnnqzzvvcfclcrrzfzrzttchttshsphshddrgdggvwgvwwjjzbbprrgwrrcttwbwpwfffqppwnpwpqwwwbmwwjrjprrrsfrfdfrddvdzvzqzgzmgmpgpmmpspdssdlsldsdwssgzgddttqpphllvbvccjzjppffsjsbbvnbvbttgwtgtftzzlhzzjvzvsvtsttfrfrsswpwnwccqtqrqqrhqhjhccpfpgpjgpprnprrscctddqmdqqncqctqqrpqrprwpwnwnrnccmfmdfmfdfnfdnnphhbhttsszgssvhhprprnrsrrvggdllvfvrvbrbsrbrpphhqbbhllpttjmttrstszzwllbsbzzgmzgzbzcbcbjcbbjdjpjtttwggqhhpzpzszqqzhqqhrhlrrrvnrnqrqgrqggzccnnjrrcmmzvmmvtmtltvvlzlmmbnmmbbclljnjhhbjbhbjbbfcbfcfbbqwwftfhttwvwhhwfwcffwvwmmwtwftfjttwdtwdtwttqnttmdtdjtdjjlzjzhjhwwnbbmdmhhjmhmjjwmmpsmmhrrfnnqrqjrrpmpjpzpbzpztppswsmsnnlnppscsgcgsccsfcctbtcctvcvhvjhhccppbrbcrbrmbmvmllnmllgfgmgdmmslmlrmllhttgrrsttlmmnrrrlqqsjjddzzsbsdbbrjbjvbbfwwwglljplpglltlztzvtzzmbzbmbmcchlchcnhccbhhhzrrglgmgwwwwrddvmmvdvvpjpnpspmpsmpsscrrphpdhdllrsspcspsqslsspbbmcbmmdhdwhwpphfhmmfhmhjmjrrhtrtffsddwsddwccvncczlzjzdjzddszdsstgtbthhjhddwppvhvvvwrvwrrpspjpvjjsmsccszzgpzzmjzmzvmvrmmgbglgppbfppvvqffgdgtgpgdgnghhbhgbbpbdbrrjrtjtggvzzvttwbwlbwbttrbttvdttpctcrtrccddfrrmqqjrqqsvqsqzsslnlggmrggnllvdvbvmbmsmwmfmvvdwvwbbnddvfvzzjppbpgpvgppblbzznsscwssqppgbbfwwfmfzzqqgnnjnffvbfvbbfllbhlltvtnvnbnsnddcjcbjbbjpbbhhjghhqjjlttnmmhwmhwwddlppsjppgtthllsclcvvlfvvvlzvlvcccrhrrvqrvvzrvzrrmqqbtbnnwssvhvtttnsttrnnghgdggmgdmmnbnhbhdbddvppvhvlvttzmttljlflvfvpfpwffqbffjllnvlltslsttrvrdrmddtwdwmmlplhlnlffmzzrssvsgsffzjfjcffrcrppzfzbbtltjljtjftfmmmrjmjqmjqmjqmjqjsqqhzzhdhrrcwwbcltfjdgmhvmqmmsclsdgmdqzcvzznwgtdbzgvlpzvdqrvwpmndtzmdpznnplmbvvmffdpbjztvzpwffvqbwmvbmtwjrdpngrftvgznmtzwzmsrvpgpzjcdwvnqplfgncgcdtjbhcqztgqpdhwlmrjbzhcfhnzqmpzzghzpfzbgwmlqztnbdnntgdcfssgzqndhfwdtrbpzbmqjgjflmcllscjnnnrzzsjhnwptjlbhpcwwhsvqqlvjzghnwvzmwtbjgwfgmpdfcjfswvqzwdbnvlwfbmdcjvgjcdhjfbjccsjqrgdrhrjnhgpvvfjqvfwqpgmgfsbsnlrfnbtpzljmzrjmjlldgbvvwbnpqgsnzzmswtwgshdlwhsttdjlhnnlgbprwltbppttctttftrmbjccvwtljqffrcpwnwjgcwjnhmphfsnbfdnfbvzqqlwbnjjdvplrjbflcrwjtrngwzznzhsmnwzfbpjrdmjlwzvrvrblrscjlrmswjpbrtjjbsgzwjnfwwgmnbbppqfnlmfsbpwbdnjmrcvqdhhvrrvmghlbbpfsqzsnbjvrvthnrhlttsnlbgvsdvsmncdglrgpsqjqthnlrhnzpnnjgvrnmdnrtjbmlppfppnmgjhtbzpztdmclgbqjzsgfjllplpnnmjhgpcfcpcmbnwjsdmfmrqvqvjfsrnqhbrzdvwcsmmjvqpjnzbgrhwcwggvvjzbrswplgvbbqhdlqptzjvzcznspjbpvfmgbcfjbgmztmqtlzmzzzpmcdmmvhvnphpcfwcmwqwwqvmwpwhhnspmhrdmjblzhhlphwldfclsfjbzhjglvllldnmtjtwqtztfcvjdngslhnsmmlwlpzdbrrthtwfpjfvfljddplfgnhcnwwmmpgwwspnsprsvprccwvvljwbqwrzqjmwfrnnjbrfsrglnrwdfnsswqwsbpplgnfnvvvhqwmtgsdwmvnzmbjpbscdtcrmsllljwlntjzpwqvvnznmfddtgrmqbdsczhtvjdwrwvjccrqnjlnqbvqhhvnmqmrmnqllcjzcjgzwctrntjsnhrwmcqzrwzzqgqlmbqczlgtmtwlztclhwcjsgbdlfrppwrpbnpgsjfhprvzjwnpdwsjwmdcbmljclcgcnsqcpzgvrrbnnhjhblgnpcbzbcdmgjmpmpcwwdngmggmfqcjcwrzblsfmrslbblhdlwjqrrgtnvcfsccbdgnjcztrblrwbrvdzcnnshwzzvgcqwpqmjzhzlllbtzmcqpnwwqqlcjtrrzfmdpmpblmwztwqdgbmtfggjwnmffzvszgdmhfvflthzmwqgqvgmldzpbwbdvrjldhbnzsthqsczttbbthzgzmmrcmzmzmjfrhbtmsbqrbnsnzzfpvwlwpszdptljqphrdznhbwbfdfhsrqnmlqdcdgbrbsmgwwbbjsmwhzgmqtmfbndzlmlvmrrvrmqbjqbhhqtvvgbhbmsrtljwmtnhtpwjvlrgqljvgpsfrwgdfbcwlmvfdrrlgwvvzvcftwpjhcplgwvqbzftjfbmmcpvrrsvbnwqdhtlsfcjzlrmwvgvgwpbffsrrpdpssqhqrqdglnwcqznzlqqvjzpsdnpwfqtfjqhqwvlfpwrqqmntcnnbfprlwrfdwstvbpjmjdbcdffmwvqbsdnvcgrtccvcfzpwjscmrtbbjjnmlcztbldfnwbqcpqlshthrcbdrfldcmhtgwrgqhnnglbzgdgglzjbgjtdvgzgrspjtbhpmzvpplgjpjbthmjtwqqzsslnfrtmpznbqvmccqccrtdvrssmdgrptsjglvrmlcwfllptczvpgwbdfbrnpzdzmpfjwdhqlsqlzlzrwcsmhcmjhhfhfvcdrzhsmqbwcfshslsnswpslbjnrzqllwbnddhrngmjqtnvhrjpcpmggvgqbwtwcmbvhnwggdrzfgmhhvpqzbvlghsvgmhngwdsrwlzffbpzqmfzvbhbjvqlcswhctpcqnptrvlwblnvpfbzsjnsdjnhqbzddsnthhcfbcvmqgfmvztlcwjbmdtgvgwqbqgdrvbgbnbcnqwzfzqpsgbvtwlphgvqlzshndcbffzcbllgzrzrnhdvqnvtndhcdslqbbhcdftlmnltmsmgfcgvmpbsljdbthjtqlfbmczznwcvfcsnftsnpzcwfqbfhjpswzfzfswfgtzplppsglsdncblddsmftmfdmmnsjjgg" }>, align 1
@alloc11 = private unnamed_addr constant <{ [1 x i8] }> <{ [1 x i8] c"\0A" }>, align 1
@alloc6 = private unnamed_addr constant <{ ptr, [8 x i8], ptr, [8 x i8] }> <{ ptr @alloc5, [8 x i8] zeroinitializer, ptr @alloc11, [8 x i8] c"\01\00\00\00\00\00\00\00" }>, align 8
@alloc9 = private unnamed_addr constant <{ [5 x i8] }> <{ [5 x i8] c"Time " }>, align 1
@alloc10 = private unnamed_addr constant <{ ptr, [8 x i8], ptr, [8 x i8] }> <{ ptr @alloc9, [8 x i8] c"\05\00\00\00\00\00\00\00", ptr @alloc11, [8 x i8] c"\01\00\00\00\00\00\00\00" }>, align 8
@alloc18 = private unnamed_addr constant <{ [32 x i8], [8 x i8], [9 x i8], [7 x i8] }> <{ [32 x i8] c"\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\00\00\00\00\02\00\00\00\00\00\00\00", [8 x i8] undef, [9 x i8] c" \00\00\00\00\00\00\00\03", [7 x i8] undef }>, align 8

; std::sys_common::backtrace::__rust_begin_short_backtrace
; Function Attrs: noinline uwtable
define internal fastcc void @_ZN3std10sys_common9backtrace28__rust_begin_short_backtrace17hcb631100b6fc7d16E(ptr nocapture noundef nonnull readonly %f) unnamed_addr #0 personality ptr @__CxxFrameHandler3 {
start:
  tail call void %f()
  tail call void asm sideeffect "", "r,~{memory}"(ptr undef) #7, !srcloc !2
  ret void
}

; std::rt::lang_start
; Function Attrs: uwtable
define hidden i64 @_ZN3std2rt10lang_start17h1c9ceeb820cd8c65E(ptr noundef nonnull %main, i64 %argc, ptr %argv, i8 %sigpipe) unnamed_addr #1 {
start:
  %_9 = alloca ptr, align 8
  call void @llvm.lifetime.start.p0(i64 8, ptr nonnull %_9)
  store ptr %main, ptr %_9, align 8
; call std::rt::lang_start_internal
  %0 = call i64 @_ZN3std2rt19lang_start_internal17h9b461f8940399158E(ptr noundef nonnull align 1 %_9, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @vtable.0, i64 %argc, ptr %argv, i8 %sigpipe)
  call void @llvm.lifetime.end.p0(i64 8, ptr nonnull %_9)
  ret i64 %0
}

; std::rt::lang_start::{{closure}}
; Function Attrs: inlinehint uwtable
define internal i32 @"_ZN3std2rt10lang_start28_$u7b$$u7b$closure$u7d$$u7d$17h9493f05d19f83e0bE"(ptr noalias nocapture noundef readonly align 8 dereferenceable(8) %_1) unnamed_addr #2 {
start:
  %_4 = load ptr, ptr %_1, align 8, !nonnull !3, !noundef !3
; call std::sys_common::backtrace::__rust_begin_short_backtrace
  tail call fastcc void @_ZN3std10sys_common9backtrace28__rust_begin_short_backtrace17hcb631100b6fc7d16E(ptr noundef nonnull %_4)
  ret i32 0
}

; core::ops::function::FnOnce::call_once{{vtable.shim}}
; Function Attrs: inlinehint uwtable
define internal i32 @"_ZN4core3ops8function6FnOnce40call_once$u7b$$u7b$vtable.shim$u7d$$u7d$17h4322647d90c166d2E"(ptr nocapture readonly %_1) unnamed_addr #2 personality ptr @__CxxFrameHandler3 {
start:
  %0 = load ptr, ptr %_1, align 8, !nonnull !3, !noundef !3
; call std::sys_common::backtrace::__rust_begin_short_backtrace
  tail call fastcc void @_ZN3std10sys_common9backtrace28__rust_begin_short_backtrace17hcb631100b6fc7d16E(ptr noundef nonnull %0), !noalias !4
  ret i32 0
}

; core::ptr::drop_in_place<std::rt::lang_start<()>::{{closure}}>
; Function Attrs: inlinehint mustprogress nofree norecurse nosync nounwind readnone willreturn uwtable
define internal void @"_ZN4core3ptr85drop_in_place$LT$std..rt..lang_start$LT$$LP$$RP$$GT$..$u7b$$u7b$closure$u7d$$u7d$$GT$17he674485e52550e2eE"(ptr nocapture readnone %_1) unnamed_addr #3 {
start:
  ret void
}

; day6_original::main
; Function Attrs: uwtable
define internal void @_ZN13day6_original4main17hb9e216409b395c50E() unnamed_addr #1 personality ptr @__CxxFrameHandler3 {
start:
  %_29 = alloca [1 x { ptr, ptr }], align 8
  %_22 = alloca %"core::fmt::Arguments", align 8
  %_17 = alloca [1 x { ptr, ptr }], align 8
  %_10 = alloca %"core::fmt::Arguments", align 8
  %elapsed = alloca { i64, i32 }, align 8
  %i = alloca i64, align 8
  %now = alloca { i64, i32 }, align 8
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %now)
; call std::time::Instant::now
  %0 = tail call { i64, i32 } @_ZN3std4time7Instant3now17ha6ea03f5a17c0ca0E()
  %.fca.0.extract = extractvalue { i64, i32 } %0, 0
  store i64 %.fca.0.extract, ptr %now, align 8
  %.fca.1.extract = extractvalue { i64, i32 } %0, 1
  %.fca.1.gep = getelementptr inbounds { i64, i32 }, ptr %now, i64 0, i32 1
  store i32 %.fca.1.extract, ptr %.fca.1.gep, align 8
  call void @llvm.lifetime.start.p0(i64 8, ptr nonnull %i)
  br label %bb5.i

bb5.i:                                            ; preds = %bb10.i, %start
  %counts.06.i = phi i32 [ 0, %start ], [ %counts.1.i, %bb10.i ]
  %iter.sroa.0.05.i = phi i64 [ 0, %start ], [ %1, %bb10.i ]
  %1 = add nuw nsw i64 %iter.sroa.0.05.i, 1
  %2 = getelementptr inbounds [0 x i8], ptr @alloc53, i64 0, i64 %iter.sroa.0.05.i
  %character.i = load i8, ptr %2, align 1
  %bit.i = add i8 %character.i, 31
  %3 = and i8 %bit.i, 31
  %4 = zext i8 %3 to i32
  %mask.i = shl nuw i32 1, %4
  %5 = xor i32 %mask.i, %counts.06.i
  %6 = tail call i32 @llvm.ctpop.i32(i32 %5), !range !7
  %_26.i = icmp ugt i32 %6, 13
  br i1 %_26.i, label %_ZN13day6_original15calculate_part217h08adfc57cd564644E.exit, label %bb7.i

bb7.i:                                            ; preds = %bb5.i
  %_30.i = icmp ugt i64 %iter.sroa.0.05.i, 12
  br i1 %_30.i, label %bb9.i, label %bb10.i

bb10.i:                                           ; preds = %bb9.i, %bb7.i
  %counts.1.i = phi i32 [ %10, %bb9.i ], [ %5, %bb7.i ]
  %exitcond.not.i = icmp eq i64 %1, 4095
  br i1 %exitcond.not.i, label %_ZN13day6_original15calculate_part217h08adfc57cd564644E.exit, label %bb5.i

bb9.i:                                            ; preds = %bb7.i
  %_33.i = add nsw i64 %iter.sroa.0.05.i, -13
  %7 = getelementptr inbounds [0 x i8], ptr @alloc53, i64 0, i64 %_33.i
  %character3.i = load i8, ptr %7, align 1
  %bit4.i = add i8 %character3.i, 31
  %8 = and i8 %bit4.i, 31
  %9 = zext i8 %8 to i32
  %mask5.i = shl nuw i32 1, %9
  %10 = xor i32 %mask5.i, %5
  br label %bb10.i

_ZN13day6_original15calculate_part217h08adfc57cd564644E.exit: ; preds = %bb5.i, %bb10.i
  %.0.i = phi i64 [ %1, %bb5.i ], [ 0, %bb10.i ]
  store i64 %.0.i, ptr %i, align 8
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %elapsed)
; call std::time::Instant::elapsed
  %11 = call { i64, i32 } @_ZN3std4time7Instant7elapsed17h2faaa714aa1601b7E(ptr noalias noundef nonnull readonly align 8 dereferenceable(16) %now)
  %.fca.0.extract1 = extractvalue { i64, i32 } %11, 0
  store i64 %.fca.0.extract1, ptr %elapsed, align 8
  %.fca.1.extract3 = extractvalue { i64, i32 } %11, 1
  %.fca.1.gep4 = getelementptr inbounds { i64, i32 }, ptr %elapsed, i64 0, i32 1
  store i32 %.fca.1.extract3, ptr %.fca.1.gep4, align 8
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_10)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_17)
  store ptr %i, ptr %_17, align 8
  %12 = getelementptr inbounds { ptr, ptr }, ptr %_17, i64 0, i32 1
  store ptr @"_ZN4core3fmt3num3imp54_$LT$impl$u20$core..fmt..Display$u20$for$u20$usize$GT$3fmt17h3948f14fac3fdb80E", ptr %12, align 8
  store ptr @alloc6, ptr %_10, align 8, !alias.scope !8, !noalias !11
  %13 = getelementptr inbounds { ptr, i64 }, ptr %_10, i64 0, i32 1
  store i64 2, ptr %13, align 8, !alias.scope !8, !noalias !11
  %14 = getelementptr inbounds %"core::fmt::Arguments", ptr %_10, i64 0, i32 1
  store ptr null, ptr %14, align 8, !alias.scope !8, !noalias !11
  %15 = getelementptr inbounds %"core::fmt::Arguments", ptr %_10, i64 0, i32 2
  store ptr %_17, ptr %15, align 8, !alias.scope !8, !noalias !11
  %16 = getelementptr inbounds %"core::fmt::Arguments", ptr %_10, i64 0, i32 2, i32 1
  store i64 1, ptr %16, align 8, !alias.scope !8, !noalias !11
; call std::io::stdio::_print
  call void @_ZN3std2io5stdio6_print17hf9f676e81421b601E(ptr noalias nocapture noundef nonnull dereferenceable(48) %_10)
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_10)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_17)
  call void @llvm.lifetime.start.p0(i64 48, ptr nonnull %_22)
  call void @llvm.lifetime.start.p0(i64 16, ptr nonnull %_29)
  store ptr %elapsed, ptr %_29, align 8
  %17 = getelementptr inbounds { ptr, ptr }, ptr %_29, i64 0, i32 1
  store ptr @"_ZN57_$LT$core..time..Duration$u20$as$u20$core..fmt..Debug$GT$3fmt17h530ecbeb245ff7a2E", ptr %17, align 8
  store ptr @alloc10, ptr %_22, align 8
  %18 = getelementptr inbounds { ptr, i64 }, ptr %_22, i64 0, i32 1
  store i64 2, ptr %18, align 8
  %19 = getelementptr inbounds %"core::fmt::Arguments", ptr %_22, i64 0, i32 1
  store ptr @alloc18, ptr %19, align 8
  %20 = getelementptr inbounds %"core::fmt::Arguments", ptr %_22, i64 0, i32 1, i32 1
  store i64 1, ptr %20, align 8
  %21 = getelementptr inbounds %"core::fmt::Arguments", ptr %_22, i64 0, i32 2
  store ptr %_29, ptr %21, align 8
  %22 = getelementptr inbounds %"core::fmt::Arguments", ptr %_22, i64 0, i32 2, i32 1
  store i64 1, ptr %22, align 8
; call std::io::stdio::_print
  call void @_ZN3std2io5stdio6_print17hf9f676e81421b601E(ptr noalias nocapture noundef nonnull dereferenceable(48) %_22)
  call void @llvm.lifetime.end.p0(i64 48, ptr nonnull %_22)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %_29)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %elapsed)
  call void @llvm.lifetime.end.p0(i64 8, ptr nonnull %i)
  call void @llvm.lifetime.end.p0(i64 16, ptr nonnull %now)
  ret void
}

declare i32 @__CxxFrameHandler3(...) unnamed_addr #4

; std::rt::lang_start_internal
; Function Attrs: uwtable
declare i64 @_ZN3std2rt19lang_start_internal17h9b461f8940399158E(ptr noundef nonnull align 1, ptr noalias noundef readonly align 8 dereferenceable(24), i64, ptr, i8) unnamed_addr #1

; Function Attrs: mustprogress nocallback nofree nosync nounwind readnone speculatable willreturn
declare i32 @llvm.ctpop.i32(i32) #5

; std::time::Instant::now
; Function Attrs: uwtable
declare { i64, i32 } @_ZN3std4time7Instant3now17ha6ea03f5a17c0ca0E() unnamed_addr #1

; std::time::Instant::elapsed
; Function Attrs: uwtable
declare { i64, i32 } @_ZN3std4time7Instant7elapsed17h2faaa714aa1601b7E(ptr noalias noundef readonly align 8 dereferenceable(16)) unnamed_addr #1

; core::fmt::num::imp::<impl core::fmt::Display for usize>::fmt
; Function Attrs: uwtable
declare noundef zeroext i1 @"_ZN4core3fmt3num3imp54_$LT$impl$u20$core..fmt..Display$u20$for$u20$usize$GT$3fmt17h3948f14fac3fdb80E"(ptr noalias noundef readonly align 8 dereferenceable(8), ptr noalias noundef align 8 dereferenceable(64)) unnamed_addr #1

; std::io::stdio::_print
; Function Attrs: uwtable
declare void @_ZN3std2io5stdio6_print17hf9f676e81421b601E(ptr noalias nocapture noundef dereferenceable(48)) unnamed_addr #1

; <core::time::Duration as core::fmt::Debug>::fmt
; Function Attrs: uwtable
declare noundef zeroext i1 @"_ZN57_$LT$core..time..Duration$u20$as$u20$core..fmt..Debug$GT$3fmt17h530ecbeb245ff7a2E"(ptr noalias noundef readonly align 8 dereferenceable(16), ptr noalias noundef align 8 dereferenceable(64)) unnamed_addr #1

define i32 @main(i32 %0, ptr %1) unnamed_addr #4 {
top:
  %_9.i = alloca ptr, align 8
  %2 = sext i32 %0 to i64
  call void @llvm.lifetime.start.p0(i64 8, ptr nonnull %_9.i)
  store ptr @_ZN13day6_original4main17hb9e216409b395c50E, ptr %_9.i, align 8
; call std::rt::lang_start_internal
  %3 = call i64 @_ZN3std2rt19lang_start_internal17h9b461f8940399158E(ptr noundef nonnull align 1 %_9.i, ptr noalias noundef nonnull readonly align 8 dereferenceable(24) @vtable.0, i64 %2, ptr %1, i8 2)
  call void @llvm.lifetime.end.p0(i64 8, ptr nonnull %_9.i)
  %4 = trunc i64 %3 to i32
  ret i32 %4
}

; Function Attrs: argmemonly mustprogress nocallback nofree nosync nounwind willreturn
declare void @llvm.lifetime.start.p0(i64 immarg, ptr nocapture) #6

; Function Attrs: argmemonly mustprogress nocallback nofree nosync nounwind willreturn
declare void @llvm.lifetime.end.p0(i64 immarg, ptr nocapture) #6

attributes #0 = { noinline uwtable "target-cpu"="x86-64" }
attributes #1 = { uwtable "target-cpu"="x86-64" }
attributes #2 = { inlinehint uwtable "target-cpu"="x86-64" }
attributes #3 = { inlinehint mustprogress nofree norecurse nosync nounwind readnone willreturn uwtable "target-cpu"="x86-64" }
attributes #4 = { "target-cpu"="x86-64" }
attributes #5 = { mustprogress nocallback nofree nosync nounwind readnone speculatable willreturn }
attributes #6 = { argmemonly mustprogress nocallback nofree nosync nounwind willreturn }
attributes #7 = { nounwind }

!llvm.module.flags = !{!0, !1}

!0 = !{i32 7, !"PIC Level", i32 2}
!1 = !{i32 7, !"PIE Level", i32 2}
!2 = !{i32 2723574}
!3 = !{}
!4 = !{!5}
!5 = distinct !{!5, !6, !"_ZN3std2rt10lang_start28_$u7b$$u7b$closure$u7d$$u7d$17h9493f05d19f83e0bE: %_1"}
!6 = distinct !{!6, !"_ZN3std2rt10lang_start28_$u7b$$u7b$closure$u7d$$u7d$17h9493f05d19f83e0bE"}
!7 = !{i32 0, i32 33}
!8 = !{!9}
!9 = distinct !{!9, !10, !"_ZN4core3fmt9Arguments6new_v117hf88cab1d745e6cd4E: argument 0"}
!10 = distinct !{!10, !"_ZN4core3fmt9Arguments6new_v117hf88cab1d745e6cd4E"}
!11 = !{!12}
!12 = distinct !{!12, !10, !"_ZN4core3fmt9Arguments6new_v117hf88cab1d745e6cd4E: %args.0"}
