import { useState, useEffect } from "react";
import type { Coupon } from "../../../types/coupon";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  initialData?: Coupon | null;
  onSubmit: (data: Partial<Coupon>) => void;
};

export default function CouponForm({ initialData, onSubmit }: Props) {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [value, setValue] = useState<number | "">("");
  const [usageCount, setUsageCount] = useState<number | "">("");
  const [maxUsage, setMaxUsage] = useState<number | "">("");
  const [minOrderValue, setMinOrderValue] = useState<number | "">("");
  const [validFrom, setValidFrom] = useState<string>("");
  const [validTo, setValidTo] = useState<string>("");
  const [status, setStatus] = useState<"active" | "inactive" | "expired">("active");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 🧩 Nếu đang sửa thì load dữ liệu cũ
  useEffect(() => {
    if (initialData) {
      setCode(initialData.code || "");
      setDescription(initialData.description || "");
      setDiscountType(initialData.discountType || "percentage");
      setValue(initialData.value || 0);
      setUsageCount(initialData.usageCount || 0);
      setMaxUsage(initialData.maxUsage || 0);
      setMinOrderValue(initialData.minOrderValue || 0);
      setValidFrom(initialData.validFrom ? String(initialData.validFrom).slice(0, 10) : "");
      setValidTo(initialData.validTo ? String(initialData.validTo).slice(0, 10) : "");
      setStatus(initialData.status || "active");
    }
  }, [initialData]);

  // 🧩 Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!code.trim()) newErrors.code = "Vui lòng nhập mã giảm giá";
    if (!value || Number(value) <= 0) newErrors.value = "Giá trị phải lớn hơn 0";
    if (discountType === "percentage" && Number(value) > 100)
      newErrors.value = "Phần trăm giảm giá không được lớn hơn 100";

    if (validFrom && validTo && new Date(validFrom) > new Date(validTo))
      newErrors.validTo = "Ngày kết thúc phải sau ngày bắt đầu";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🧩 Gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data: Partial<Coupon> = {
      code: code.trim(),
      description: description.trim(),
      discountType,
      value: Number(value),
      usageCount: usageCount !== "" ? Number(usageCount) : undefined,
      maxUsage: maxUsage !== "" ? Number(maxUsage) : undefined,
      minOrderValue: minOrderValue !== "" ? Number(minOrderValue) : undefined,
      validFrom: validFrom || undefined,
      validTo: validTo || undefined,
      status,
    };

    onSubmit(data);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Code */}
      <div>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Mã giảm giá"
          className="border px-3 py-2 rounded w-full"
        />
        {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
      </div>

      {/* Description */}
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả mã giảm giá"
          className="border px-3 py-2 rounded min-h-[60px] w-full"
        />
      </div>

      {/* Discount Type */}
      <select
        value={discountType}
        onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed")}
        className="border px-3 py-2 rounded"
      >
        <option value="percentage">Giảm theo %</option>
        <option value="fixed">Giảm cố định</option>
      </select>

      {/* Value */}
      <div>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Giá trị giảm"
          className="border px-3 py-2 rounded w-full"
        />
        {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
      </div>

      {/* Usage Count & Max Usage */}
      <div className="flex gap-2">
        <input
          type="number"
          value={usageCount}
          onChange={(e) => setUsageCount(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Đã sử dụng"
          className="border px-3 py-2 rounded w-1/2"
        />
        <input
          type="number"
          value={maxUsage}
          onChange={(e) => setMaxUsage(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Số lần tối đa"
          className="border px-3 py-2 rounded w-1/2"
        />
      </div>

      {/* Min Order Value */}
      <div>
        <input
          type="number"
          value={minOrderValue}
          onChange={(e) => setMinOrderValue(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Giá trị đơn tối thiểu"
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      {/* Valid From & To */}
      <div className="flex gap-2">
        <input
          type="date"
          value={validFrom}
          onChange={(e) => setValidFrom(e.target.value)}
          className="border px-3 py-2 rounded w-1/2"
        />
        <input
          type="date"
          value={validTo}
          onChange={(e) => setValidTo(e.target.value)}
          className="border px-3 py-2 rounded w-1/2"
        />
        {errors.validTo && <p className="text-red-500 text-sm mt-1">{errors.validTo}</p>}
      </div>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "active" | "inactive" | "expired")}
        className="border px-3 py-2 rounded"
      >
        <option value="active">Hoạt động</option>
        <option value="inactive">Không hoạt động</option>
        <option value="expired">Hết hạn</option>
      </select>

      {/* Submit */}
      <div className="mt-8 flex justify-between gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500
            hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2 rounded-lg
            shadow-lg transition-all duration-300 font-medium
          "
        >
          <FaArrowLeft className="text-lg" />
          Quay lại
        </button>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg shadow-md font-medium"
        >
          {initialData ? "Cập nhật mã giảm giá" : "Thêm mới"}
        </button>
      </div>
    </form>
  );
}
